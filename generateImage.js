import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// Delete the old screenshot if it exists
if (fs.existsSync('suspended.png')) {
    fs.unlinkSync('suspended.png');
}

(async () => {
  
    const htmlContent = fs.readFileSync(path.resolve('preview.html'), 'utf-8');
    
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    
    // Can adjust this for different devices later (phone, tablet, etc.)
    await page.setViewport({
        width: 1404,
        height: 1872,
    });

    await page.setContent(htmlContent);
    
    await page.screenshot({ path: 'suspended.png' });
    
    await browser.close();
})();
