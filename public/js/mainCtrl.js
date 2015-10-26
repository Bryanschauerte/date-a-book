var app = angular.module('dateABook')
.controller('mainCtrl', function($scope, userService, googleService, $location, bookService, $mdToast){

$scope.searchCriteria = ["Author", "Title"];
$scope.reviewTime = false;
$scope.addingABook = false;
$scope.enterInfo = true;
$scope.showAddbookButton = false;
$scope.noSearchResults = false;
$scope.showAlreadyReviewedBookMessage = false;
$scope.googleBookSearch = [];
$scope.showLoading = false;

$scope.showSimpleToast = function(text) {
  $mdToast.show(
    $mdToast.simple()
      .content(text)
      .highlightAction(true)
      .hideDelay(3000)
  );
};

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

$scope.moveNewBook = function(bookToAdd) {
$scope.bookToAdd.title = $scope.capitalizeTitle(bookToAdd.title);
$scope.bookToAdd.author = $scope.capitalizeTitle(bookToAdd.author);


var newBookId='';
  bookToAdd.image = "n/a";
  $scope.showLoading =true;
  $scope.bookInfo = {};
    bookService.addBook(bookToAdd.title, bookToAdd.author, bookToAdd.genre, bookToAdd.image, bookToAdd.description, bookToAdd.publishDate)
      .then(function(successResult){
      newBookId = successResult.data._id;
      bookInfo = successResult;
    })
        .then(function(response){
          bookService.addReview(newBookId, bookToAdd.violence, bookToAdd.loveEct, bookToAdd.suspence, bookToAdd.realism, bookToAdd.horror, bookToAdd.humor, bookToAdd.scienceFiction, bookToAdd.supernaturalContent, bookToAdd.readingLevel)})
          .then(function(response){
            bookService.addBookReviewDoer($scope.user._id, newBookId)
          }).then(function(response){
            userService.addReviewToUser($scope.user._id, bookInfo.data._id)
          })
            .then(function(response){
              $scope.googleBookSearch = [];
              $scope.showSimpleToast(bookToAdd.title + " review added!");
              $scope.addingABook = false;
              $scope.regSearchText = '';
              $scope.showAddbookButton = false;
              $scope.showLoading = false;

            });
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

            if(res == 'fail'){
              $location.path("/route");
              $scope.showSimpleToast("You Need to be logged in to do that!");
            }



    })
  }
else {
    $scope.showSimpleToast("Welcome, " + $scope.user.name);
}
};

$scope.capitalizeTitle = function(string){
  var newArr = string.split(" ");
  for(var i = 0; i < newArr.length; i++){
    newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].slice(1).toLowerCase();
}
return newArr.join(' ');
}



$scope.getBooksRegSearch = function(regSearchText, typeOfSearch){
  $scope.showAddbookButton = true;
  $scope.showLoading = true;

  var searchText = $scope.capitalizeTitle(regSearchText)
  if(typeOfSearch == "title"){

    bookService.getBookIdFromTitle(searchText).then(function(initialResponse){
        $scope.regBooksToShow = googleService.getBooksRegSearch(searchText, typeOfSearch)
          .then(function(res){
            for(var i=0; i< res.length; i++){
              if(res[i].author && res[i].author.length > 1){
            res[i].author= res[i].author.join(', ');
          }
          }

            $scope.googleBookSearch = res;
            if(initialResponse.data.length > 0){
          $scope.googleBookSearch.unshift(initialResponse.data[0])
          for(var i = 0; i < $scope.googleBookSearch.length; i++){
            $scope.googleBookSearch[i].author = Array($scope.googleBookSearch[i].author);
                  }
           }

      })
    })
  }else{
       $scope.regBooksToShow = googleService.getBooksRegSearch(searchText, typeOfSearch)
         .then(function(res){
           for(var i=0; i< res.length; i++){
             if(res[i].author && res[i].author.length > 1){
           res[i].author= res[i].author.join(', ');}
         }

           $scope.googleBookSearch = res;
     })
   }

      $scope.enterInfo = false;
      $scope.showLoading =false;

    };

$scope.resetSelect = function(){
  $scope.reviewTime = false;
}

$scope.alreadyReviewedBook = function(){
  $scope.showAlreadyReviewedBookMessage = true;
  $scope.showSimpleToast("You have already reviewed that book!")
}

$scope.targetForReview= function(targetForReview){
  $scope.targetBookForReview = targetForReview;
  $scope.reviewTime = true;
  $scope.getUser()
}

$scope.doAReview = function(targetBookForReview, testRate){
  $scope.doit = true;
  $scope.showLoading = true;
  $scope.reviewTime = true;
  $scope.reviewedInThePastBooks = userService.getBooksReviewed($scope.user._id).then(function(successR){
    $scope.reviewedInThePastBooks = successR.data.booksReviewed;
//
    }).then(function(success){
  for(var i = 0; i < $scope.reviewedInThePastBooks.length; i++){
    if($scope.reviewedInThePastBooks[i].title == targetBookForReview){
      $scope.alreadyReviewedBook();
      $scope.doit = false;
      $scope.reviewTime = false;
      $scope.showLoading = false;
    }
  }
  //
}).then(function(res){


  if($scope.doit) {
    bookService.getBookIdFromTitle(targetBookForReview).then(function(successResult){
      var newBookId = '';
      $scope.targetBookForReview.image = "n/a";

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
                    $scope.reviewTime = false;
                    $scope.showLoading = false;
                    $scope.showSimpleToast($scope.targetBookForReview.title + " review added!")
                  });
                  //if($scope.doIt == false)
    }else {
            bookService.addReview(successResult.data[0]._id, testRate.violence, testRate.loveEct, testRate.suspence, testRate.realism, testRate.horror, testRate.humor, testRate.scienceFiction, testRate.supernaturalContent, testRate.readingLevel)
            .then(function(response){
              bookService.addBookReviewDoer($scope.user._id, successResult.data[0]._id)
            }).then(function(response){
              userService.addReviewToUser($scope.user._id, successResult.data[0]._id)
            })
              .then(function(response){
                $scope.reviewTime = false;
                $scope.showLoading = false;
                $scope.showSimpleToast($scope.targetBookForReview.title + " review added!")
              });
            }
          })
        }

        $scope.googleBookSearch = [];
        $scope.regSearchText = '';
        $scope.showLoading = false;
        })
      }

})
