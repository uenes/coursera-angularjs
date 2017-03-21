(function () {
  'use strict';

  angular.module('MenuApp')
  .component('items',{
    // shows all of the menu items for a particular category.
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    bindings: {
      items: '<'
    }
  })
})();
