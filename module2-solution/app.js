(function(){
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',toBuyController)
    .controller('AlreadyBoughtController',alreadyBoughtController)
    .service('ShoppingListCheckOffService',shoppingListCheckOffService);


    toBuyController.$inject = ['ShoppingListCheckOffService'];
    function toBuyController(ShoppingListCheckOffService){
        var buy = this;
        buy.tobuyitems =  ShoppingListCheckOffService.getbuyitems();
        buy.addBoughtItem = function(itemIndex){
             ShoppingListCheckOffService.addBoughtItem(itemIndex);
        }
        
        }

    alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function alreadyBoughtController(ShoppingListCheckOffService){
        var bought = this;
        bought.boughtitems = ShoppingListCheckOffService.getboughtitems();
        
    }

    function shoppingListCheckOffService(){
        var service = this;
        var tobuy = [{
            name : 'Cookies',
            quantity : 10
        },
        {
            name :  'Milk',
            quantity : 20  
        },
        {
            name : 'Bread',
            quantity : 30
        }
        ,{
            name : 'Coke',
            quantity : 15
        },
        {
            name : 'Pepsi',
            quantity : 25
        }];

        var bought = [];
        service.getbuyitems = function (){
            return tobuy;
        }

        service.getboughtitems = function(){
            return bought;
        }

        

        service.addBoughtItem = function (itemIndex){
            bought.push(tobuy[itemIndex]);
            tobuy.splice(itemIndex, 1);
            
        }
       

    }
})();