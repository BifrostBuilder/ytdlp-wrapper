import { spawn } from 'child_process';
import { getYtDlpPath, getFfmpegPath } from './binary-paths';
import { YtDlpOptions, VideoInfo, DownloadOptions, DownloadProgress } from './types';

export class YtDlp {
  private ytDlpPath: string;
  private ffmpegPath: string;

  constructor() {
    this.ytDlpPath = getYtDlpPath();
    this.ffmpegPath = getFfmpegPath();
  }

  private buildCommand(url: string, options: YtDlpOptions = {}): string[] {
    const args: string[] = ['--no-warnings'];

    if (options.format) args.push('-f', options.format);
    if (options.output) args.push('-o', options.output);
    
    if (options.extractAudio) {
      args.push('-x');
      args.push('-k');
      if (options.audioFormat) args.push('--audio-format', options.audioFormat);
      if (options.audioQuality) args.push('--audio-quality', options.audioQuality);
    }

    if (options.subtitles) {
      args.push('--write-sub');
      if (options.subtitlesLanguage) args.push('--sub-lang', options.subtitlesLanguage);
    }

    if (options.playlist) {
      if (options.playlistStart) args.push('--playlist-start', options.playlistStart.toString());
      if (options.playlistEnd) args.push('--playlist-end', options.playlistEnd.toString());
    } else {
      args.push('--no-playlist');
    }

    if (options.additionalArgs) {
      args.push(...options.additionalArgs);
    }
    if(this.ffmpegPath){
      args.push("--ffmpeg-location",this.ffmpegPath.toString());
    }

    args.push(url);
    return args;
  }

  private parseProgress(data: string): DownloadProgress | null {
    // Example progress line: "[download]  50.0% of 10.00MiB at  1.00MiB/s ETA 00:05"
    const progressMatch = data.match(/\[download\]\s+(\d+\.\d+)%\s+of\s+~?\s*([\d.]+)(K|M|G)iB\s+at\s+([\d.]+)(K|M|G)iB\/s\s+ETA\s+(\d+):(\d+)/);
    
    if (progressMatch) {
      const [, percentage, size, sizeUnit, speed, speedUnit, etaMin, etaSec] = progressMatch;
      
      const units = { K: 1024, M: 1024 ** 2, G: 1024 ** 3 };
      const totalBytes = parseFloat(size) * units[sizeUnit as keyof typeof units];
      const speedBytes = parseFloat(speed) * units[speedUnit as keyof typeof units];
      const downloadedBytes = (parseFloat(percentage) / 100) * totalBytes;
      const eta = parseInt(etaMin) * 60 + parseInt(etaSec);

      return {
        downloadedBytes,
        totalBytes,
        percentage: parseFloat(percentage),
        speed: speedBytes,
        eta
      };
    }
    return null;
  }

  public async download(url: string, options: DownloadOptions = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      const args = this.buildCommand(url, options);
      const process = spawn(this.ytDlpPath, args);

      process.stdout.on('data', (data) => {
        const line = data.toString();
        if (options.onProgress) {
          const progress = this.parseProgress(line);
          if (progress) {
            options.onProgress(progress);
          }
        }
        console.log(line);
      });

      process.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
    });
  }

  public async getInfo(url: string): Promise<VideoInfo> {
    return new Promise((resolve, reject) => {
      const args = ['--dump-json', '--no-playlist', url];
      const process = spawn(this.ytDlpPath, args);
      let output = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          try {
            const info: VideoInfo = JSON.parse(output);
            resolve(info);
          } catch (error) {
            reject(new Error(`Failed to parse video info: ${error}`));
          }
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
      });
    });
  }
}