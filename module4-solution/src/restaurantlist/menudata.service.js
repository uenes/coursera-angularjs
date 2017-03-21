(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService).
constant('RestApiRestaurant', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http','RestApiRestaurant']
function MenuDataService($http, RestApiRestaurant) {
  var service = this;

  service.getFromService = function () {
    var response = $http({
      method: "GET",
      url: (RestApiRestaurant + "/categories.json")
    });
    return response;
  }

  service.getItems = function () {
    var promise = service.getFromService();
    promise.then(function (response) {
      console.log("menudata.service > getItems :",response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }
}

})();
