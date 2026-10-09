const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com/';

module.exports = {
  baseUrl,
  headless: process.env.HEADLESS !== 'false',
  recordVideo: process.env.RECORD_VIDEO === 'true',
  timeout: Number(process.env.PLAYWRIGHT_TIMEOUT || 15000)
};
