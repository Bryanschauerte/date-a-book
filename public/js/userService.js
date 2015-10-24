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
},
this.getBooksReviewed = function(userID){
  return $http({
    method: "GET",
    url: "http://localhost:8881/api/user/books/" + userID
  });

},

this.addReviewToUser = function(userID, bookID){

  return $http({
    method: "PUT",
    url:"http://localhost:8881/api/user/addBookReview/" + userID,
    data: {
      bookID: bookID
    }
  })
}




});
