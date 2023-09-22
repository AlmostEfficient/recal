This repo will fetch events from Google calendar and generate an image you can use as the suspended/sleep screen for your Remarkable 2. 

Remarkable image dimensions
1404x1872 72 dpi 8 bit PNG

V0.1
Google Calendar

V0.2
iCloud (soom `tm`)

## How this works
1. `preview.html` is the HTML that's used to generate the content of the image. Update styling/layout here.
2. `generateImage.js` fetches events from the Google Calendar API and uses Puppeteer to load preview and generate the image.

## Prerequisites
1. Node.js installed
2. Service account credentials for Google Calendar API. Follow [this guide](https://stateful.com/blog/events-in-the-google-calendar-API) to create a service account, download the credentials file, and share your calendar with the service account email address. You can stop following the guide when it gets to the Node.js setup.
   <!-- 2. Go to the [Google Console](https://console.cloud.google.com/apis/dashboard) and create a new project (or use an existing one).
   3. Enable the Google Calendar API in the [API library](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com).
   4. Go to [IAM & Admin](https://console.cloud.google.com/iam-admin/serviceaccounts) and create a new service account. 
   5. Click the email that was just generated, navigate to the keys menu and add a new JSON key.
   6.  -->
## Setup steps
1. npm i 
2. Put your service account credentials in the root of the project and name it `credentials.json`.
3. Update `ENTER_YOUR_CALENDAR_ID_HERE` on line 8 in `generateImage.js` with your calendar ID.
4. Run `npm start`. A `suspended.png` will be generated.
