var app = angular.module('dateABook')
.controller('mainCtrl', function($scope, $http, $animate, userService, googleService, $timeout, bookService, $mdToast){

$scope.searchCriteria = ["Author", "Title"];
$scope.reviewTime = false;
$scope.addingABook = false;
$scope.enterInfo = true;





$scope.addBookNotListed = function(){

  $scope.addingABook = true;
  $(document).ready(function() {
    $('select').material_select();
  });
  $scope.getUser();

}

$scope.notAddingABook= function(){
  $scope.addingABook = false;
}

//move a book into the db                                         here add to db
$scope.moveNewBook = function(bookToAdd) {
var newBookId='';
  bookToAdd.image = "n/a";

    bookService.addBook(bookToAdd.title, bookToAdd.author, bookToAdd.genre, bookToAdd.image, bookToAdd.description, bookToAdd.publishDate)
      .then(function(response){
      newBookId = response.data._id;
    })
        .then(function(response){
          bookService.addReview(newBookId, bookToAdd.violence, bookToAdd.loveEct, bookToAdd.suspence, bookToAdd.realism, bookToAdd.horror, bookToAdd.humor, bookToAdd.scienceFiction, bookToAdd.supernaturalContent, bookToAdd.understandability)})
          .then(function(response){
            bookService.addBookReviewDoer($scope.user._id, newBookId)
          })
            .then(function(response){
              $scope.addingABook = false});
};

$scope.bookToAdd = {
  pubdate: '',
  genre: '',
  author:[],
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


  if(!$scope.user){
    $scope.user = userService.getUser().then(function(res){
      $scope.user =res.userInfo;

    })

  }


};


$scope.googleBookSearch = [];

$scope.getBooksRegSearch = function(regSearchText, typeOfSearch){
  //check to see if in db
if(typeOfSearch == "title"){
    bookService.getBookIdFromTitle(regSearchText).then(function(response){
    console.log(response);

      if(response == undefined){
        $scope.regBooksToShow = googleService.getBooksRegSearch(regSearchText, typeOfSearch)
          .then(function(res){ $scope.googleBookSearch = res;  })
      }else {
        $scope.googleBookSearch = response.data;
        for(var i = 0; i < $scope.googleBookSearch.length; i++){
          $scope.googleBookSearch[i].author = Array($scope.googleBookSearch[i].author);
          console.log($scope.googleBookSearch[i].author)
        }

      }
  })
  } else {
      $scope.regBooksToShow = googleService.getBooksRegSearch(regSearchText, typeOfSearch)
        .then(function(res){  $scope.googleBookSearch = res; })
      }
      $scope.enterInfo = false;
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
