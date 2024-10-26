import { YtDlp } from './ytdlp';
import { DownloadOptions } from './types';

const ytdlp = new YtDlp();
var dwopts = { 
    extractAudio: true,
    audioFormat: 'mp3',
    output: '%(id)s.%(ext)s',
} as DownloadOptions
// Get video information
const foo = async () => {
    const info = await ytdlp.download('https://www.youtube.com/watch?v=t_kWOKjXHQA', dwopts);
    console.log(info);
};

console.log("Hello, World!");
function test() {
    foo();
}
test();