(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrow',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.name = "";
  menu.nothingFound = function () {
    if (MenuSearchService.getCategories() === null) {
      return false;
    } else {
      return MenuSearchService.getCategories() < 1;
    }
  }
  menu.found = function () {
    return MenuSearchService.getCategories();
  }
  menu.searchItems = function () {
    MenuSearchService.getMatchedMenuItems(menu.name);
  }

  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  }
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.categories = null;

  service.searchByDescription = function (name, list) {
    var result = [];
    console.log("length",list.length);
    for (var i = 0; i < list.length; i++) {
      console.log("list[i].description", list[i].description);
      console.log("name", name);
      if (list[i].description.indexOf(name) != -1) {
        result.push(list[i]);
      }
    }
    return result;
  }

  service.getMenu = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

  service.getMatchedMenuItems = function (name) {
    if (name != "") {
      var promise = service.getMenu();

      promise.then(function (response) {
        service.categories = service.searchByDescription(name, response.data.menu_items);
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    } else {
      service.categories = [];
    }

  }

  service.getCategories = function () {
    return service.categories;
  }

  service.removeItem = function (itemIndex) {
    service.categories.splice(itemIndex,1);
  }
}

})();
