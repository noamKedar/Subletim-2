import {ApartmentComponents} from "./apartment.components";

var core_1 = require('@angular/core');
var apartment_service_1 = require('apartment.service');
var apartmentComponent = (function () {
  function apartmentComponent(apartmentService) {
    var _this = this;
    this.apartmentService = apartmentService;
    this.apartmentService.getApartments()
      .subscribe(function (apartments) {
        _this.apartments = apartments;
      });
  }
  apartmentComponent.prototype.addApartment = function (event) {
    var _this = this;
    event.preventDefault();
    var newApartment = {
      id: this.id,
      address: this.address,
      apartmentName: this.apartmentName,
      city: this.city,
      //owner: this.User,
      roomNumber: this.roomNumber
    };
    this.apartmentService.addApartment(newApartment)
      .subscribe(function (apartment) {
        _this.apartments.push(apartment);
      });
  };
  apartmentComponent.prototype.deleteApartment = function (id) {
    var apartments = this.apartments;
    this.apartmentService.deleteApartment(id).subscribe(function (data) {
      if (data.n == 1) {
        for (var i = 0; i < apartments.length; i++) {
          if (apartments[i]._id == id) {
            apartments.splice(i, 1);
          }
        }
      }
    });
  };
  apartmentComponent.prototype.updateApartment = function (apartment) {
    var _apartment = {
      id: apartment.id,
      address: apartment.address,
      apartmentName: apartment.apartmentName,
      city: apartment.city,
      //owner: apartment.User,
      roomNumber: apartment.roomNumber
    };

  };
  apartmentComponent = __decorate([
    core_1.Component({
      moduleId: module.id,
      selector: 'apartment',
      templateUrl: 'apartment.component.html'
    }),
    __metadata('design:paramtypes', [apartment_service_1.apartmentService])
  ], ApartmentComponents);
  return ApartmentComponents;
}());
exports.ApartmentComponents = ApartmentComponents;
