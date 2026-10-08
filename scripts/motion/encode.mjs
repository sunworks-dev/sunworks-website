import { spawn } from 'node:child_process';
import { access, mkdir, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const frameRoot = process.argv[2] || '/tmp/sunworks-film-frames';
const output = resolve('public/assets/motion');
await mkdir(output, { recursive: true });

function run(command, args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    console.log(
      JSON.stringify({
        command,
        pid: child.pid,
        ppid: process.pid,
        startedAt: new Date().toISOString(),
      }),
    );
    let stdout = '',
      stderr = '';
    child.stdout.on('data', (data) => {
      stdout += data;
    });
    child.stderr.on('data', (data) => {
      stderr += data;
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolveRun(stdout) : reject(new Error(stderr)),
    );
  });
}

const manifest = {
  title: 'Daydreams deserve daylight',
  fps: 30,
  duration: 16,
  audio: false,
  assets: [],
};
for (const lang of ['ko', 'en']) {
  for (const format of ['desktop', 'mobile']) {
    const frames = resolve(frameRoot, `${lang}-${format}`);
    const name = `daylight-${lang}-${format}`;
    // Both outputs share one lossless PNG decode. No audio stream is created.
    const reusable =
      process.argv.includes('--reuse-video') &&
      (await Promise.all([
        access(`${output}/${name}.mp4`),
        access(`${output}/${name}.webm`),
      ]).then(
        () => true,
        () => false,
      ));
    if (!reusable)
      await run('ffmpeg', [
        '-hide_banner',
        '-loglevel',
        'error',
        '-y',
        '-framerate',
        '30',
        '-start_number',
        '0',
        '-i',
        `${frames}/%04d.png`,
        '-map',
        '0:v:0',
        '-frames:v',
        '480',
        '-an',
        '-c:v',
        'libx264',
        '-preset',
        'slow',
        '-crf',
        '25',
        '-maxrate',
        '2200k',
        '-bufsize',
        '4400k',
        '-pix_fmt',
        'yuv420p',
        '-movflags',
        '+faststart',
        '-threads',
        '4',
        '-color_primaries',
        'bt709',
        '-color_trc',
        'bt709',
        '-colorspace',
        'bt709',
        `${output}/${name}.mp4`,
        '-map',
        '0:v:0',
        '-frames:v',
        '480',
        '-an',
        '-c:v',
        'libvpx-vp9',
        '-b:v',
        '0',
        '-crf',
        '34',
        '-deadline',
        'good',
        '-cpu-used',
        '2',
        '-row-mt',
        '1',
        '-threads',
        '4',
        '-pix_fmt',
        'yuv420p',
        '-color_primaries',
        'bt709',
        '-color_trc',
        'bt709',
        '-colorspace',
        'bt709',
        `${output}/${name}.webm`,
      ]);
    // Pillow performs only lossless-source format conversion, with no art edits.
    await run('python3', [
      '-c',
      'from PIL import Image; import sys; Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], "WEBP", quality=82, method=6)',
      `${frames}/poster.png`,
      `${output}/${name}.webp`,
    ]);
    for (const ext of ['mp4', 'webm', 'webp']) {
      const file = `${name}.${ext}`;
      const bytes = (await stat(`${output}/${file}`)).size;
      const probe = JSON.parse(
        await run('ffprobe', [
          '-v',
          'error',
          '-count_frames',
          '-show_streams',
          '-show_format',
          '-of',
          'json',
          `${output}/${file}`,
        ]),
      );
      const stream = probe.streams[0];
      if (
        ext !== 'webp' &&
        (probe.streams.length !== 1 ||
          stream.codec_type !== 'video' ||
          stream.avg_frame_rate !== '30/1' ||
          Number(stream.nb_read_frames) !== 480 ||
          Math.abs(Number(probe.format.duration) - 16) > 0.05)
      )
        throw new Error(`Invalid video: ${file}`);
      if (ext !== 'webp' && bytes > 2.5 * 1024 * 1024)
        throw new Error(`Video exceeds 2.5 MiB budget: ${file}`);
      if (ext === 'webp' && bytes > 180 * 1024)
        throw new Error(`Poster exceeds 180 KiB budget: ${file}`);
      manifest.assets.push({
        file,
        bytes,
        width: stream.width,
        height: stream.height,
        codec: stream.codec_name,
      });
      console.log(
        JSON.stringify({
          file,
          bytes,
          width: stream.width,
          height: stream.height,
        }),
      );
    }
  }
}
await writeFile(
  `${output}/manifest.json`,
  JSON.stringify(manifest, null, 2) + '\n',
);
