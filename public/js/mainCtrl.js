var app = angular.module('dateABook')
.controller('mainCtrl', function($scope, $http, $animate, userService, googleService, $mdToast){

$scope.searchCriteria = ["Author", "Title"];
$scope.reviewTime = false;





$scope.addingABook = false;

$scope.addBookNotListed = function(){
  $scope.addingABook = true;
  $(document).ready(function() {
    $('select').material_select();
  });

}

$scope.notAddingABook= function(){
  $scope.addingABook = false;
}

//move a book into the db                                         here add to db
$scope.moveNewBook = function(bookToAdd) {
console.log(bookToAdd);
bookToAdd.image = "n/a";
//add a new book to db
bookService.addBook(bookToAdd.title, bookToAdd.author, bookToAdd.genre, bookToAdd.image, bookToAdd.description, bookToAdd.publishDate);
//get new bookID
?
//push the new book's review
bookService.addReview(userID, bookID, bookToAdd.violence, bookToAdd.loveEct, bookToAdd.suspence, bookToAdd.realism, bookToAdd.horror, bookToAdd.humor, bookToAdd.scienceFiction, bookToAdd.supernaturalContent, bookToAdd.understandability);


$scope.addingABook = false;

};

$scope.bookToAdd = {
  pubdate: '',
  genre: '',
  author:'',
  title:'',
  violence: 0,
  loveEct: 0,
  suspence: 0,
  realism: 0,
  horror: 0,
  humor: 0,
  scienceFiction: 0,
  supernaturalContent: 0,
  understandability: 0

}

$scope.testRate = {
  violence: 0,
  loveEct: 0,
  suspence: 0,
  realism: 0,
  horror: 0,
  humor: 0,
  scienceFiction: 0,
  supernaturalContent: 0,
  understandability: 0
}


$scope.getUser = function(){
  $scope.user = userService.currentUser().then(function(res){
    $scope.user = res;

  })
};


$scope.googleBookSearch = [];

$scope.getBooksRegSearch = function(regSearchText, typeOfSearch){
    $scope.regBooksToShow = googleService.getBooksRegSearch(regSearchText, typeOfSearch)
    .then(function(res){
      $scope.googleBookSearch = res;
    })
};

$scope.resetSelect = function(){
  $scope.reviewTime = false;

}
                                                          // here get reviews
$scope.targetForReview= function(targetForReview){

  $scope.targetBookForReview = targetForReview;
  $scope.reviewTime = true;
}
                                                        //here add to db
$scope.doAReview = function(testRate){
  alert(testRate);

}


})
