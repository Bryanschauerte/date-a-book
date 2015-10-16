var app = angular.module('dateABook').service('userService', function($http, $q){


this.currentUser = function(){
  return $http({
    method: "GET",
    url:"http://localhost:8881/api/user"
  })
  .then(function(response){
    return response.data;
  });
}



});
