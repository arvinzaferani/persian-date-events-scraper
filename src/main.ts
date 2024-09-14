import { CheerioCrawler } from 'crawlee';
import fs from 'fs';
import {
    convertMonthToNumber,
    convertNumberToDoubleDigitString,
    elementHasClass,
    isGregorianEvent,
    isLunarEvent, replacePersianNumber,
} from "../helpers.js";
import {EventInterface} from "./types.js";

// Function to process each page and extract events
const year = '1403'
const crawler = new CheerioCrawler({
    async requestHandler({ request, $,}) {
        {

            console.log(`Processing: ${request.url}`);
            // Select the events elements from the page

            const events = $('.eventsCurrentMonthWrapper ul li')
            const extractedEvents:EventInterface[] = []
            // Make process on each event element
            events.each(((_, el) => {
                // split row element
                const rowSplitter = $(el).text().trim().split('\r\n')
                const date = rowSplitter?.[0].trim()
                const event = rowSplitter?.[1].trim()
                const foreignDate: string = rowSplitter?.[2]?.replace('[','')?.replace(']','')?.trim()
                let [day, month] = date?.split(' ')
                day = convertNumberToDoubleDigitString(parseInt(replacePersianNumber(day)))
                month = convertMonthToNumber(month)
                const targetElement = $(el)
                const isHoliday = elementHasClass(targetElement, 'eventHoliday')
                extractedEvents.push({
                    date:  year+'-'+month+'-'+day,
                    event: event,
                    is_holiday: isHoliday,
                    is_lunar: isLunarEvent(rowSplitter),
                    lunar_date: isLunarEvent(rowSplitter) ? foreignDate : '',
                    is_gregorian: isGregorianEvent(rowSplitter),
                    gregorian_date: isGregorianEvent(rowSplitter) ? foreignDate : ''
                })
            }))


            // Save results to file
            fs.appendFileSync('events.json', JSON.stringify(extractedEvents, null, 2));
            console.log('Done! Events JSON saved on events.json file.')
        }
    },
});

// Start the crawler on the specific events page of time.ir for the year 1403
crawler.run(['https://www.time.ir/fa/eventyear-%d8%aa%d9%82%d9%88%db%8c%d9%85-%d8%b3%d8%a7%d9%84%db%8c%d8%a7%d9%86%d9%87?year=' + year]);
