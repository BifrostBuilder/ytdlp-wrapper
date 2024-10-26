import { YtDlp } from '../ytdlp';

describe('YtDlp', () => {
  let ytdlp: YtDlp;

  beforeEach(() => {
    ytdlp = new YtDlp();
  });

  it('should be defined', () => {
    expect(ytdlp).toBeDefined();
  });

  // Note: Add more tests based on your specific needs
  // Actual download tests would require mocking the spawn function
});