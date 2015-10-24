var app = angular.module('dateABook')
.controller('mainCtrl', function($scope, $http, $animate, userService, googleService, $timeout, bookService, $mdToast){

$scope.searchCriteria = ["Author", "Title"];
$scope.reviewTime = false;
$scope.addingABook = false;
$scope.enterInfo = true;
$scope.showAddbookButton = false;
//for when google got nothing
$scope.noSearchResults = false;

$scope.showAlreadyReviewedBookMessage = false;


$scope.addBookNotListed = function(){

  $scope.addingABook = true;
  $(document).ready(function() {
    $('select').material_select();
  });
  $scope.getUser();
console.log($scope.user);
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
          bookService.addReview(newBookId, bookToAdd.violence, bookToAdd.loveEct, bookToAdd.suspence, bookToAdd.realism, bookToAdd.horror, bookToAdd.humor, bookToAdd.scienceFiction, bookToAdd.supernaturalContent, bookToAdd.readingLevel)})
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
  readingLevel: 0

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
  readingLevel: 0
}


$scope.getUser = function(){


  if(!$scope.user){
    $scope.user = userService.getUser().then(function(res){
      $scope.user =res;
    })

  }

};


$scope.googleBookSearch = [];

$scope.getBooksRegSearch = function(regSearchText, typeOfSearch){
  $scope.showAddbookButton = true;
  //check to see if in db
if(typeOfSearch == "title"){
    bookService.getBookIdFromTitle(regSearchText).then(function(response){


      if(response == undefined || []){
        console.log("book not found");
        $scope.regBooksToShow = googleService.getBooksRegSearch(regSearchText, typeOfSearch)
          .then(function(res){ $scope.googleBookSearch = res;  })
      }else {
        console.log("should not be making a new fucking book!! WTF!?")
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
        console.log($scope.googleBookSearch);
};

$scope.resetSelect = function(){
  $scope.reviewTime = false;

}

$scope.alreadyReviewedBook = function(){
$scope.showAlreadyReviewedBookMessage = true;
//countdown and reset

}
                                                          // here get reviews
$scope.targetForReview= function(targetForReview){

  $scope.targetBookForReview = targetForReview;
  $scope.reviewTime = true;
  $scope.getUser()
}
                                                        //here add to db
$scope.doAReview = function(targetBookForReview, testRate){

$scope.doit = true;

$scope.reviewedInThePastBooks = userService.getBooksReviewed($scope.user._id).then(function(successR){
  $scope.reviewedInThePastBooks = successR.data.booksReviewed;
});

for(var i = 0; i < reviewedInThePastBooks.length; i++){
  if(reviewedInThePastBooks[i].title == targetBookForReview){
    $scope.alreadyReviewedBook();
    $scope.doit = false;
  }
}
  // $scope.getUser().then(function(sucess){
if($scope.doit)
{
  bookService.getBookIdFromTitle(targetBookForReview).then(function(successResult){



    var newBookId = '';
      $scope.targetBookForReview.image = "n/a";
  ////need to look here for the book
  //
  if(successResult.data.length == 0){
        bookService.addBook($scope.targetBookForReview.title, $scope.targetBookForReview.author, $scope.targetBookForReview.genre, $scope.targetBookForReview.image, $scope.targetBookForReview.description, $scope.targetBookForReview.publishDate)
          .then(function(response){
          newBookId = response.data._id;
        })
            .then(function(response){
              bookService.addReview(newBookId, testRate.violence, testRate.loveEct, testRate.suspence, testRate.realism, testRate.horror, testRate.humor, testRate.scienceFiction, testRate.supernaturalContent, testRate.readingLevel)})
              .then(function(response){
                bookService.addBookReviewDoer($scope.user._id, newBookId)
              }).then(function(response){
                userService.addReviewToUser($scope.user._id, newBookId)
              })
                .then(function(response){
                  $scope.reviewTime = false;});


  }else {

          ///here for bookID?
          bookService.addReview(successResult.data[0]._id, testRate.violence, testRate.loveEct, testRate.suspence, testRate.realism, testRate.horror, testRate.humor, testRate.scienceFiction, testRate.supernaturalContent, testRate.readingLevel)
          .then(function(response){
            bookService.addBookReviewDoer($scope.user._id, successResult.data[0]._id)
          }).then(function(response){
            userService.addReviewToUser($scope.user._id, successResult.data[0]._id)
          })
            .then(function(response){
              $scope.reviewTime = false;});


  }

  })
  // })
  }
}
//need to redirect here for log in
})
