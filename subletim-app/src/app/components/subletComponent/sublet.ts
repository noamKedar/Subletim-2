import {Apartment} from "../apartmentComponent/apartment";

export class Sublet {
  subletName: string;
  startDate: Date;
  endDate: Date;
  price: number;
  apartment: string;
  _id?: string;
  apartmentObject: Apartment;
}
