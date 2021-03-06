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
        narrow.errorDisplay = "";
        narrow.items = [];
        narrow.getMenuItem = function () {
            var promise = MenuSearchService.method(narrow.searchTerm);
            promise.then(function (result){
                
                if(result.length === 0 || narrow.searchTerm === ""){
                    narrow.errorDisplay = "Nothing Found";
                    narrow.items=[];
                }
                else
                {
                    narrow.items = result;
                    narrow.errorDisplay = "";
                }
                
            })
            .catch (function () {
                narrow.errorDisplay = "Nothing Found";
                narrow.items = [];
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