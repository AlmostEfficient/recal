This repo will fetch events from my iCloud and Google calendars. 

Remarkable image dimensions
1404x1872 72 dpi 8 bit PNG

V0.1
Google Calendar

V0.2
iCloud

# MVP 0.5
1. Generate an image with Puppeteer. 
2. Update the image to be 1404x1872 pixels and 72 DPI.
3. Add date/time to the image.

## How this works
1. `preview.html` is the HTML that's used to generate the content of the image.
2. `generateImage.js` uses Puppeteer to load preview and generate the image.