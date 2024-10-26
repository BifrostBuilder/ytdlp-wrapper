export interface YtDlpOptions {
  format?: string;
  output?: string;
  extractAudio?: boolean;
  audioFormat?: 'mp3' | 'wav' | 'm4a' | 'aac';
  audioQuality?: string;
  subtitles?: boolean;
  subtitlesLanguage?: string;
  playlist?: boolean;
  playlistStart?: number;
  playlistEnd?: number;
  additionalArgs?: string[];
}

export interface VideoFormat {
  ext: string;
  vcodec: string;
  acodec: string;
  format_id: string;
  tbr: number;
  quality: number;
  format_note: string | null;
  preference: number;
  filesize: number;
  width: number;
  height: number;
  url: string;
  protocol: string;
  resolution: string;
  dynamic_range: string;
  aspect_ratio: number;
  video_ext: string;
  audio_ext: string;
  vbr: number | null;
  abr: number | null;
  format: string;
}

export interface HttpHeaders {
  'User-Agent': string;
  'Accept': string;
  'Accept-Language': string;
  'Sec-Fetch-Mode': string;
  'Referer': string;
}

export interface Thumbnail {
  url: string;
  id: string;
}

export interface VideoInfo {
  id: string;
  title: string;
  description: string;
  duration: number;
  duration_string: string;
  upload_date: string;
  timestamp: number;
  channel: string;
  channel_id: string;
  channel_url: string;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  view_count: number;
  like_count: number;
  repost_count: number;
  comment_count: number;
  track?: string;
  artists?: string[];
  formats: VideoFormat[];
  thumbnails: Thumbnail[];
  webpage_url: string;
  original_url: string;
  webpage_url_basename: string;
  webpage_url_domain: string;
  extractor: string;
  extractor_key: string;
  thumbnail: string;
  display_id: string;
  fulltitle: string;
  release_year: number | null;
  artist?: string;
  _has_drm: boolean | null;
  epoch: number;
  subtitles: Record<string, any>;
  http_headers: HttpHeaders;
}

export interface DownloadProgress {
  downloadedBytes: number;
  totalBytes: number;
  percentage: number;
  speed: number; // bytes per second
  eta: number; // seconds
}

export interface DownloadOptions extends YtDlpOptions {
  onProgress?: (progress: DownloadProgress) => void;
}