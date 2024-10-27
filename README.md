# ytdlp-wrapper

A TypeScript wrapper for yt-dlp with cross-platform binary support.

## Installation

```bash
npm i @yggdrasil_fenrir/ytdlp-wrapper
```

## Usage

```typescript
import { YtDlp } from '@yggdrasil_fenrir/ytdlp-wrapper';

const ytdlp = new YtDlp();

// Download a video
await ytdlp.download('https://youtube.com/watch?v=...', {
  format: 'best',
  output: '%(title)s.%(ext)s'
});

// Get video information
const info = await ytdlp.getInfo('https://youtube.com/watch?v=...');
console.log(info.title);

// Extract audio
await ytdlp.download('https://youtube.com/watch?v=...', {
  extractAudio: true,
  audioFormat: 'mp3',
  audioQuality: '0' // best
});
```

## Binary Structure

Place the binaries in the following structure:

```
bin/
├── windows/
│   ├── yt-dlp.exe
│   └── ffmpeg.exe
├── linux/
│   ├── yt-dlp
│   └── ffmpeg
└── macos/
    ├── yt-dlp
    └── ffmpeg
```

Make sure to make the Linux and macOS binaries executable:
```bash
chmod +x bin/linux/yt-dlp bin/linux/ffmpeg bin/macos/yt-dlp bin/macos/ffmpeg
```

## Features

- Cross-platform support (Windows, macOS, Linux)
- TypeScript types included
- Video download with customizable options
- Audio extraction
- Subtitle download
- Playlist support
- Video information retrieval
- Custom command-line arguments support

## License

MIT