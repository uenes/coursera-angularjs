(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['items']
function ItemDetailController(items) {
  var itemsController = this;
  itemsController.items = items;
}

})();
