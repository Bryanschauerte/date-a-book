var app = angular.module('dateABook').service('userService', function($http, $q){


this.currentFaceBookUser = function(){
  return $http({
    method: "GET",
    url:"/api/user/facebook"
  })
  .then(function(response){
    return response.data;
  });
},

this.currentGoogleUser = function(){
  return $http({
    method: "GET",
    url:"/api/user/google"
  })
  .then(function(response){
    return response.data;
  });
},

this.getUser = function(){
  return $http({
    method: "GET",
    url:"/api/user"
  })
  .then(function(response){
    return response.data;

  }, function(fail){
    return "fail";
  });
},
this.getBooksReviewed = function(userID){
  return $http({
    method: "GET",
    url: "/api/user/books/" + userID
  });

},

this.addReviewToUser = function(userID, bookID){

  return $http({
    method: "PUT",
    url:"/api/user/addBookReview/" + userID,
    data: {
      bookID: bookID
    }
  })
}




});
