import { platform } from 'os';
import { join } from 'path';
import path_1 = require("path");


let BINARIES_DIR = join(__dirname, '..', 'bin');
if (!(process.cwd() === join(__dirname, '..'))) {
 BINARIES_DIR = path_1.join(path_1.resolve("node_modules"), "@yggdrasil_fenrir/ytdlp-wrapper", 'bin');
 
}
export function getYtDlpPath(): string {
  const os = platform();
  switch (os) {
    case 'win32':
      return join(BINARIES_DIR, 'windows', 'yt-dlp.exe');
    case 'darwin':
      return join(BINARIES_DIR, 'macos', 'yt-dlp');
    case 'linux':
      return join(BINARIES_DIR, 'linux', 'yt-dlp');
    default:
      throw new Error(`Unsupported platform: ${os}`);
  }
}

export function getFfmpegPath(): string {
  const os = platform();
  switch (os) {
    case 'win32':
      return join(BINARIES_DIR, 'windows', 'ffmpeg.exe');
    case 'darwin':
      return join(BINARIES_DIR, 'macos', 'ffmpeg');
    case 'linux':
      return join(BINARIES_DIR, 'linux', 'ffmpeg');
    default:
      throw new Error(`Unsupported platform: ${os}`);
  }
}