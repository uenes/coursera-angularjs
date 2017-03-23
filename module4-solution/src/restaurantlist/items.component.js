(function () {
  'use strict';

  angular.module('MenuApp')
  .component('items',{
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    bindings: {
      items: '<'
    }
  })
})();
