var app = angular.module('dateABook').service('userService', function($http, $q){


this.currentFaceBookUser = function(){
  return $http({
    method: "GET",
    url:"http://localhost:8881/api/user/facebook"
  })
  .then(function(response){
    return response.data;
  });
},

this.currentGoogleUser = function(){
  return $http({
    method: "GET",
    url:"http://localhost:8881/api/user/google"
  })
  .then(function(response){
    return response.data;
  });
},

this.getUser = function(){
  return $http({
    method: "GET",
    url:"http://localhost:8881/api/user"
  })
  .then(function(response){
    return response.data;
  });
}




});
