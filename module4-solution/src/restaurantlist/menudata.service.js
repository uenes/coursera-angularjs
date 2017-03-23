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

  service.getAllCategories = function () {
    return service.getFromService().then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  service.getItemsForCategory = function (short_name) {
    return service.getByIDFromService(short_name).then(function (response) {
      return response.data.menu_items;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }

  service.getByIDFromService = function (short_name) {
    var response = $http({
      method: "GET",
      url: (RestApiRestaurant + "/menu_items.json?"),
      params: {category: short_name}
    });
    return response;
  }
}

})();
