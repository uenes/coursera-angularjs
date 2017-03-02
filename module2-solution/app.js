(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buy = this;

  buy.items = ShoppingListCheckOffService.getItemsToBuy();
  ShoppingListCheckOffService.addItemToBuy("cookies", 10);
  ShoppingListCheckOffService.addItemToBuy("milks", 2);
  ShoppingListCheckOffService.addItemToBuy("sugars", 7);
  ShoppingListCheckOffService.addItemToBuy("bread", 1);
  ShoppingListCheckOffService.addItemToBuy("Ham", 4);

  buy.addItem = function () {
    ShoppingListCheckOffService.addItemToBuy(buy.name, buy.quantity);
  }

  buy.boughtItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.boughtItem(itemIndex);
    } catch (error) {
      buy.message = error.message;
    }

  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getItemsBought();
  bought.message = ShoppingListCheckOffService.getBoughtMessage();
}

function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [];
  var itemsBought = [];

  service.addItemToBuy = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      itemsToBuy.push(item);
  };

  service.boughtItem = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
    service.getBoughtMessage();
    if (itemsToBuy.length < 1) {
      throw new Error("Everything is bought!");
    }
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  }

  service.getBoughtMessage = function () {
    console.log("getBoughtMessage itemsBought",itemsBought);
    if (itemsBought.length > 0) {
      console.log("getBoughtMessage if",itemsBought);
      return undefined;
    } else {
      console.log("getBoughtMessage else",itemsBought);
      return "Nothing bought yet.";
    }
  }
}

})();
