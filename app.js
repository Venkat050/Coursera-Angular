(function (){
'use strict'
    angular.module('myFirstApp', [])
    .controller('MyFirstController',function ($scope){
        $scope.name = "";
        $scope.totalNameValue = 0;
        $scope.calculateNameValue = function () {
            var totalStringValue = calculateNumericValueFunction($scope.name);
            $scope.totalNameValue = totalStringValue;
        };

        function calculateNumericValueFunction(string){
            var totalStringValue = 0;
            for(var i=0;i<string.length;i++)
            {
                totalStringValue += string.charCodeAt(i);
            }
            return totalStringValue;
        }
    });
})();