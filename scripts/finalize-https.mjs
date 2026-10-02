import { spawnSync } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';

const repository = 'sunworks-dev/sunworks-website';
const domain = 'www.sunworks.kr';
const attempts = 40;

console.log(
  JSON.stringify({
    pid: process.pid,
    parentPid: process.ppid,
    startedAt: new Date(Date.now() - process.uptime() * 1000).toISOString(),
  }),
);

// Run with the repository administrator's existing gh login. The default
// GitHub Actions token cannot change HTTPS enforcement for this repository.
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  const result = spawnSync(
    'gh',
    [
      'api',
      '--method',
      'PUT',
      `repos/${repository}/pages`,
      '-F',
      'https_enforced=true',
    ],
    { encoding: 'utf8', timeout: 30_000 },
  );

  if (result.error) throw result.error;
  if (result.status === 0) {
    try {
      const secure = await fetch(`https://${domain}/`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(20_000),
      });
      const plain = await fetch(`http://${domain}/`, {
        method: 'HEAD',
        redirect: 'manual',
        signal: AbortSignal.timeout(20_000),
      });
      const location = plain.headers.get('location');
      if (
        secure.ok &&
        [301, 302, 307, 308].includes(plain.status) &&
        location &&
        new URL(location, `http://${domain}/`).protocol === 'https:'
      ) {
        console.log(`Verified: https://${domain}/ and HTTP → HTTPS redirect.`);
        process.exit(0);
      }
      console.log('HTTPS enabled; waiting for the edge redirect to update.');
    } catch (error) {
      console.log(`HTTPS enabled; TLS verification pending: ${error.message}`);
    }
  } else {
    let message;
    try {
      message = JSON.parse(result.stdout).message;
    } catch {
      throw new Error(
        result.stderr.trim() || 'GitHub API returned no response.',
      );
    }
    const certificatePending = [
      'The certificate does not exist yet',
      'Unavailable for your site because a certificate has not yet been issued for your domain',
    ].includes(message);
    if (!certificatePending) {
      throw new Error(message || result.stderr.trim());
    }
    console.log(`Certificate pending: attempt ${attempt}/${attempts}.`);
  }

  if (attempt < attempts) await setTimeout(60_000);
}

console.error(
  'Still pending. Check Pages DNS health, then rerun npm run launch:https.',
);
process.exitCode = 1;
