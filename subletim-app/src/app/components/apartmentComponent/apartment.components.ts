import {Component, Output, EventEmitter} from "@angular/core";
import {ApartmentService} from '../../services/apartment.service'
import {Apartment} from './apartment'
import {User} from "../user/user";
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
@Component({
  selector: 'apartment',
  templateUrl: 'apartment.components.html',
  providers: [ApartmentService],
  styleUrls: ['./apartment.component.css']
})

export class ApartmentComponents {
  apartments: Apartment[];
  currentUser: User;
  apartmentToEdit: number;
  createOrEdit: boolean = false;
  isAdminUser: boolean = false;
  @Output() showApartments = new EventEmitter<boolean>();
  constructor(private apartmentService: ApartmentService, private userService: UserService, private authenticationService: AuthenticationService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.isAdmin()
    this.setApartmentsByUser()
  }

  addNewApartment() {
    this.apartmentToEdit = null;
    this.createOrEdit = true;
  }

  finishedAddingOrCreate(){
    this.apartmentService.getApartments()
      .subscribe(apartments => {
        this.apartments = apartments;
      });
    console.log('got here 4');
    this.apartmentToEdit = null;
    this.createOrEdit = false;
    this.setApartmentsByUser()
  }

  deleteApartment(id){
    var apartments = this.apartments;
    this.apartmentService.deleteApartment(id).subscribe(data => {
      if(data.n == 1){
        for(var i = 0;i < apartments.length;i++){
          if(apartments[i]._id == id){
            apartments.splice(i, 1);
          }
        }
      }
    });
  }

  editApartment(apartment){
    this.apartmentToEdit = apartment;
    this.createOrEdit = true;
  }

  searchApartment(){
    this.apartmentToEdit = null;
    this.createOrEdit = false;

    let city = (<HTMLInputElement>document.getElementById("cityTxt")).value
    let address = (<HTMLInputElement>document.getElementById("addressTxt")).value
    let rooms = (<HTMLInputElement>document.getElementById("roomTxt")).value
    let currentUser = this.currentUser._id;
    let isAdmin = this.currentUser.isAdmin;
    this.apartmentService.searchApartment(city, address, rooms, currentUser, isAdmin).subscribe(apartments => {
      this.userService.getUsers().subscribe(users => {
        const usersDict = {};
        users.forEach(user => {
          usersDict[user._id] = user;
        });
        apartments.forEach(apartment => {
          apartment.owner = usersDict[apartment.owner]
        });
        this.apartments = apartments;
      });
    });
  }
  isAdmin() {
    this.isAdminUser = this.currentUser.isAdmin;
  }

  returnToMainPage() {
    this.showApartments.emit(false);
  }

  setApartmentsByUser(){
    if(this.currentUser.isAdmin) {
      this.apartmentService.getApartments()
        .subscribe(apartments => {
          this.userService.getUsers().subscribe(users => {
            const usersDict = {};
            users.forEach(user => {
              usersDict[user._id] = user;
            });
            console.log(usersDict)
            apartments.forEach(apartment => {
              apartment.owner = usersDict[apartment.owner]
            });
            this.apartments = apartments;
          });
        });
    }
    else{
      this.apartmentService.getUserApartments(this.currentUser._id)
        .subscribe(apartments => {
          this.userService.getUsers().subscribe(users => {
            const usersDict = {};
            users.forEach(user => {
              usersDict[user._id] = user;
            });
            apartments.forEach(apartment => {
              apartment.owner = usersDict[apartment.owner]
            });
            this.apartments = apartments;
          });
        });
    }
  }
}
