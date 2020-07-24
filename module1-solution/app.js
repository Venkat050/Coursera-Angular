(function (){
  'use strict'

    angular.module('LunchCheck',[])
    .controller('LunchCheckController',lunchCheckController);
    lunchCheckController.$inject = ['$scope'];
 
    function lunchCheckController($scope){
        $scope.dish="";
        $scope.message = "";
        $scope.color="white";
        $scope.checkDishes = function(){
            
            $scope.color="green";
            $scope.message = findNoofItems($scope.dish);
        };

        function findNoofItems(string){
            var dishes = string.split(",");
            dishes = dishes.filter(item => item);
            if(dishes.length == 0)
            {
                $scope.color = "red";
                return " Please enter data first";
            }
            else if(dishes.length < 4){
                return "Enjoy!";
            }
            else{
                return "Too Much!";
            }
        }
    }
       
            
    })();