import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { google } from 'googleapis';
import { format, isToday, parseISO, isWithinInterval, addDays } from 'date-fns';

// Setup the API client
const calendarId = 'ENTER_YOUR_CALENDAR_ID_HERE';
const keyFile = 'credentials.json';
const keys = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
const auth = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  'https://www.googleapis.com/auth/calendar.readonly',
]);

const quotes = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

const calendar = google.calendar({ version: 'v3', auth });

(async () => {
  const now = new Date();
  const threeDaysFromNow = addDays(now, 3);

  // Fetching the events
  const {
    data: { items: events },
  } = await calendar.events.list({
    calendarId,
    timeMin: now.toISOString(),
    timeMax: threeDaysFromNow.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  // If no events found, exit
  if (!events.length) {
    console.log('No events found');
    process.exit();
  }
  
  // Populating the HTML content
  let todayEvents = '';
  let upcomingEvents = '';

  events.forEach((event) => {
    const start = parseISO(event.start.dateTime || event.start.date);
    const formattedTime = format(start, 'hh:mm a');
    const formattedDay = format(start, 'EEEE');

    const eventHtml = `
            <div class="event">
                ${event.summary}
                <div class="event-time">${formattedTime}</div>
            </div>`;

    const upcomingEventHtml = `<div class="upcoming-event">${formattedDay} - ${formattedTime}: ${event.summary}</div>`;

    if (isToday(start)) todayEvents += eventHtml;
    else upcomingEvents += upcomingEventHtml;
  });

  // Reading and Updating the HTML file
  let htmlContent = fs.readFileSync(path.resolve('preview.html'), 'utf-8');
  htmlContent = htmlContent.replace(
    /<div class="events">[\s\S]*?<\/div>/,
    `<div class="events">${todayEvents}</div>`
  );
  htmlContent = htmlContent.replace(
    /<div class="upcoming-events">[\s\S]*?<\/div>/,
    `<div class="upcoming-events">${upcomingEvents}</div>`
  );
  htmlContent = htmlContent.replace(
    /<div class="quote">[\s\S]*?<\/div>/,
    `<div class="quote">"${randomQuote.quote}"<br><span class="author">- ${randomQuote.author}</span></div>`
  );

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1404, height: 1872 });
  await page.setContent(htmlContent);
  await page.screenshot({ path: 'suspended.png' });
  await browser.close();
  console.log('Image generated successfully');
})();
