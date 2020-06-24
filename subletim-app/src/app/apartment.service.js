var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var ApartmentService = (function () {
  function ApartmentService(http) {
    this.http = http;
    console.log('Apartment Service Initialized...');
  }
  ApartmentService.prototype.getApartment = function () {
    return this.http.get('/api/apartmentes')
      .map(function (res) { return res.json(); });
  };
  ApartmentService.prototype.addApartment = function (newApartment) {
    var headers = new http_1.Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/apartment', JSON.stringify(newApartment), { headers: headers })
      .map(function (res) { return res.json(); });
  };
  ApartmentService.prototype.deleteApartment = function (id) {
    return this.http.delete('/api/apartment/' + id)
      .map(function (res) { return res.json(); });
  };
  TaskService.prototype.updateApartment = function (apartment) {
    var headers = new http_1.Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/task/' + apartment._id, JSON.stringify(apartment), { headers: headers })
      .map(function (res) { return res.json(); });
  };
  ApartmentService = __decorate([
    core_1.Injectable(),
    __metadata('design:paramtypes', [http_1.Http])
  ], ApartmentService);
  return ApartmentService;
}());
exports.ApartmentService = ApartmentService;

