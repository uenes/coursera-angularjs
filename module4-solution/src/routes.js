(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/restaurantlist/templates/home.template.html'
  })

  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/restaurantlist/templates/main-categories.template.html',
    controller: 'MainShoppingListController as mainList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        var resultado = MenuDataService.getItems();
        console.log("GetItems of routes", resultado);

        return resultado;
      }]
    }
  })

  .state('itemDetail', {
    url: '/item-detail/{itemId}',
    templateUrl: 'src/restaurantlist/templates/item-detail.template.html',
    controller: 'ItemDetailController as item',
    resolve: {
      item: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              var test  = MenuDataService.getAllCategories()
                .then(function (items) {
                  return items[$stateParams.itemId];
                });
              console.log(">>>>>", test);
              return MenuDataService.getAllCategories()
                .then(function (items) {
                  return items[$stateParams.itemId];
                });
            }]
    }
  });
}

})();
