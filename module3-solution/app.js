(function (){
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('ApiBasePath'," https://davids-restaurant.herokuapp.com")
    .directive('foundItems',foundItems);

    function foundItems() {
        var ddo = {
            scope : {
                items: '<',
                onRemove: '&'
            },
            templateUrl : 'foundItems.html'
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var narrow = this;
        narrow.searchTerm = "";
        narrow.items = [];
        narrow.getMenuItem = function (searchTerm) {
            var promise = MenuSearchService.method(searchTerm);
            promise.then(function (result){
                narrow.items = result;
                
            })
            .catch (function () {
                console.log("Error")
            });
        }

        narrow.removeItem = function (index) {
            narrow.items.splice(index,1);
        };
    }

    MenuSearchService.$inject = ['$http','ApiBasePath','$q'];
    function MenuSearchService($http,ApiBasePath,$q){
        var service = this;
        service.method = function (searchTerm) { 
            return $http({
            method : 'GET',
            url : (ApiBasePath+"/menu_items.json")
        })
        .then (function (result){
            var menu_items = result.data['menu_items'];
            var deferred = $q.defer();
            var foundItems = [];
            menu_items.forEach(element => {
                if(element['description'].search(searchTerm) > -1){
                    foundItems.push(element);
                }
            });
            if(foundItems.length > 0 )
            {
                deferred.resolve(foundItems);
            }
            else
            {
                deferred.reject("No found items!!!");

            }
            return deferred.promise;
        });
    }
    }


})();