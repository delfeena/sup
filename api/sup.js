const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Enable request interception
    await page.setRequestInterception(true);

    // Array to store intercepted requests
    const interceptedRequests = [];

    // Event listener to intercept requests
    page.on('request', interceptedRequest => {
      interceptedRequests.push(interceptedRequest.url());
      interceptedRequest.continue();
    });

    // Navigate to the URL
    await page.goto('https://multiembed.mov/directstream.php?video_id=tt6791350');

    // Wait for some time to capture requests
    await page.waitForTimeout(5000);

    // Close the browser
    await browser.close();

    // Send intercepted requests as response
    res.status(200).json({ interceptedRequests });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while executing the Puppeteer script' });
  }
};
