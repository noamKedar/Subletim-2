import {User} from "../user/user";

export class Apartment{
  _id?: string;
  apartmentName: string;
  address: string;
  city: string;
  owner: User;
  roomNumber: number;
}
