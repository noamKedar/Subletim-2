import {Component, EventEmitter, Output} from "@angular/core";
import {SubletService} from "../../services/sublet.service";
import {User} from "../user/user";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import puppeteer from "puppeteer/lib/esm";
import {Sublet} from "../subletComponent/sublet";
import {Apartment} from "../apartmentComponent/apartment";
import {ApartmentService} from "../../services/apartment.service";

@Component({
  selector: 'main-page',
  templateUrl: './mainPage.component.html',
  providers: [],
  styleUrls: ['./mainPage.component.css']
})

export class MainPageComponent {
  addSublet: boolean = false;
  searchSublet: boolean = false;
  addApartment: boolean = false;
  logoutUser: boolean = false;
  users: boolean = false;
  editUser: boolean = false;
  currentUser: User;
  viewApartments: boolean = false;
  @Output() showLoginChange = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService,
              private subletService: SubletService,
              private apartmentService: ApartmentService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  toggleAddSublet() {
    this.addSublet = !this.addSublet;
  }

  toggleSearchSublet() {
    this.searchSublet = !this.searchSublet;
  }

  toggleAddApartment() {
    this.addApartment = !this.addApartment;
  }

  toggleLogoutUser(){
    this.authenticationService.logout();
    this.logoutUser = !this.logoutUser;
  }

  toggleAdminPage() {
    this.users = !this.users;
  }

  isAdmin(){
    return this.currentUser.isAdmin;
  }

  toggleEditPage(){
    this.editUser = !this.editUser;
  }

  async subletsScraping() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1DCAMY9gMoajj1AkgJWARoaogBAZgBCbgBB8gBDNgBA-gBAfgBAogCAagCA7gCnLC9-AXAAgHSAiQ5OTIyNmZmYy1mZTNiLTRiM2ItOTkxMi05MDY0NDY5YjhhM2LYAgTgAgE&sid=8c7a166c8568969c78336b396de7a3cb&tmpl=searchresults&checkin_month=7&checkin_monthday=15&checkin_year=2020&checkout_month=7&checkout_monthday=22&checkout_year=2020&class_interval=1&dest_id=-781545&dest_type=city&dtdisc=0&from_sf=1&group_adults=2&group_children=0&inac=0&index_postcard=0&label_click=undef&no_rooms=1&postcard=0&raw_dest_type=city&room1=A%2CA&sb_price_type=total&shw_aparth=1&slp_r_match=0&srpvid=237288e2cf7b0086&ss=Tel%20Aviv&ss_all=0&ssb=empty&sshis=0&ssne=Tel%20Aviv&ssne_untouched=Tel%20Aviv&theme_id=1&top_ufis=0&nflt=ht_id%3D201%3B&percent_htype_apt=1&rsf=');
    await page.waitForSelector('#search_results_table');
    await page.evaluate(() => {
      const subletsNodes = document.querySelectorAll('#search_results_table');
      const subletNamesList = document.querySelectorAll('#hotellist_inner > div:nth-child(26) > div.sr_item_content.sr_item_content_slider_wrapper > div.sr_property_block_main_row > div.sr_item_main_block > div.sr-hotel__title-wrap > h3 > a > span.sr-hotel__name');
      const subletAddressesList = document.querySelectorAll('#hotellist_inner > div:nth-child(26) > div.sr_item_content.sr_item_content_slider_wrapper > div.sr_property_block_main_row > div.sr_item_main_block > div.sr_card_address_line > a');
      const subletPricesList = document.querySelectorAll('#hotellist_inner > div:nth-child(5) > div.sr_item_content.sr_item_content_slider_wrapper > div.sr_rooms_table_block.clearfix > div > div > div:nth-child(1) > div > div.roomPrice.roomPrice_flex.sr_discount > div.prco-wrapper.bui-price-display.prco-sr-default-assembly-wrapper.prc-d-sr-wrapper > div:nth-child(2) > div > div.bui-price-display__value.prco-text-nowrap-helper.prco-inline-block-maker-helper');
      const subletNumberOfRoomsList = document.querySelectorAll('#hotellist_inner > div:nth-child(19) > div.sr_item_content.sr_item_content_slider_wrapper > div.sr_rooms_table_block.clearfix > div > div > div:nth-child(1) > div > div.roomName.roomName_flex.--wider.unit-info > div > span > div.c-beds-configuration');
      subletsNodes.forEach((apartmentElement, i) => {
        const subletName = subletNamesList[i].textContent;
        const subletAddress = subletAddressesList[i].textContent;
        const subletPrice = subletPricesList[i].textContent;
        const subletNumOfRooms = subletNumberOfRoomsList[i].textContent;
        const startDate = new Date(2020, 7, 15);
        const endDate = new Date(2020, 7, 22);
        const newApartment: Apartment = {
          city: subletAddress,
          apartmentName: subletName,
          address: subletAddress,
          roomNumber: parseInt(subletNumOfRooms),
          owner: null
        };
        this.apartmentService.addApartment(newApartment).subscribe(apartment => {
          const newSublet: Sublet = {
            subletName: subletName,
            price: parseInt(subletPrice),
            startDate: startDate,
            endDate: endDate,
            apartment: apartment._id
          };
          this.subletService.addSublet(newSublet);
        });
      })
    })
  }

  toggleApartments() {
    this.viewApartments = !this.viewApartments;
  }
}



