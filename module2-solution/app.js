(function(){
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',toBuyController)
    .controller('AlreadyBoughtController',alreadyBoughtController)
    .service('ShoppingListCheckOffService',shoppingListCheckOffService);


    toBuyController.$inject = ['$scope','ShoppingListCheckOffService'];
    function toBuyController($scope,ShoppingListCheckOffService){
        $scope.tobuyitems =  ShoppingListCheckOffService.getbuyitems();
        $scope.addBoughtItem = function(itemIndex){
             ShoppingListCheckOffService.addBoughtItem(itemIndex);
        }
        
        }

    alreadyBoughtController.$inject = ['$scope','ShoppingListCheckOffService'];
    function alreadyBoughtController($scope, ShoppingListCheckOffService){
        $scope.boughtitems = ShoppingListCheckOffService.getboughtitems();
        console.log($scope.boughtitems)
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