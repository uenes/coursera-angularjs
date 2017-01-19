(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunch = '';
  $scope.message = '';
  $scope.checkLunch = function () {
    var array = $scope.lunch.split(',');
    var length = array.length;
    if (length > 3) {
      $scope.message = 'Too much!';
    } else if (length == 1 && array[0].length == 0) {
      $scope.message = 'Please enter data first';
    } else {
      $scope.message = 'Enjoy!';
    }
  };

}

})();
