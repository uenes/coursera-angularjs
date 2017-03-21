(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/restaurantlist/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
