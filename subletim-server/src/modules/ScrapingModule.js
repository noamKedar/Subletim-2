const puppeteer = require('puppeteer');
const mongojs = require('mongojs');

module.exports = class scrapingModule {
    db;

    constructor() {
        this.db = mongojs('subletimDB', ['apartmentsCollection', 'subletimCollection']);
    }

     async addApartment(newApartment) {
        this.db.apartmentsCollection.save(newApartment, function (err, apartment) {
            if (err) {
                throw new Error(err);
            }
            return apartment;
        });
    }

    async scrapeBooking() {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1DCAMY9gMoajj1AkgJWARoaogBAZgBCbgBB8gBDNgBA-gBAfgBAogCAagCA7gCnLC9-AXAAgHSAiQ5OTIyNmZmYy1mZTNiLTRiM2ItOTkxMi05MDY0NDY5YjhhM2LYAgTgAgE&sid=8c7a166c8568969c78336b396de7a3cb&tmpl=searchresults&checkin_month=7&checkin_monthday=15&checkin_year=2020&checkout_month=7&checkout_monthday=22&checkout_year=2020&class_interval=1&dest_id=-781545&dest_type=city&dtdisc=0&from_sf=1&group_adults=2&group_children=0&inac=0&index_postcard=0&label_click=undef&no_rooms=1&postcard=0&raw_dest_type=city&room1=A%2CA&sb_price_type=total&shw_aparth=1&slp_r_match=0&srpvid=237288e2cf7b0086&ss=Tel%20Aviv&ss_all=0&ssb=empty&sshis=0&ssne=Tel%20Aviv&ssne_untouched=Tel%20Aviv&theme_id=1&top_ufis=0&nflt=ht_id%3D201%3B&percent_htype_apt=1&rsf=');
        await page.waitForSelector('#search_results_table');
        const apartments = await page.evaluate(() => {
            const apartmentsToAdd = [];
            const subletsNodes = document.querySelectorAll('#hotellist_inner > div');
            const subletNamesList = document.querySelectorAll('#hotellist_inner > div > div.sr_item_content.sr_item_content_slider_wrapper > div.sr_property_block_main_row > div.sr_item_main_block > div.sr-hotel__title-wrap > h3 > a > span.sr-hotel__name');
            const subletAddressesList = document.querySelectorAll('#hotellist_inner > div > div.sr_item_content.sr_item_content_slider_wrapper > div.sr_property_block_main_row > div.sr_item_main_block > div.sr_card_address_line > a');
            console.log(subletsNodes);
            console.log(subletNamesList);
            console.log(subletAddressesList);
            subletsNodes.forEach(async (apartmentElement, i) => {
                const subletName = subletNamesList[i].textContent.trim();
                const subletAddress = subletAddressesList[i].textContent.split('\n')[1].trim();
                const subletNumOfRooms = Math.random() * (5 - 1) + 1;
                const newApartment = {
                    city: subletAddress,
                    apartmentName: subletName,
                    address: subletAddress,
                    roomNumber: subletNumOfRooms,
                    owner: null
                };
                console.log(newApartment);
                apartmentsToAdd.push(newApartment);
            });
            return apartmentsToAdd;
        });
        apartments.forEach(apartment => {
            this.addApartment(apartment);
        });
    }
};

