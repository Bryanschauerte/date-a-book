var app = angular.module('dateABook')
.controller('searchCtrl', function($scope, $http, $animate, userService, googleService, $timeout, bookService, $mdToast){
$scope.getUser();


$scope.searchCriteria = ["Author", "Title"];
$scope.showSearchFields = true;
$scope.range =0;
$scope.enterInfo = true;
// $scope.searchResults = [];

// dummy data

$scope.searchResults = []
// dummy data

$scope.lookingFor = {
  genre: "",
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


$scope.getAllBooks = function() {

  $scope.books = bookService.getAllBooks()
  .then(function(resolve){
    $scope.books = resolve;
  });
};




$scope.reviewsSearch = function(lookingFor, range){
$scope.count = 0;
  $scope.searchResults = [];
  $scope.showSearchFields = false;
  //check to see if in db
  $scope.searchHappening = true;

  $scope.books = bookService.getAllBooks()
  .then(function(resolve){
    $scope.books = resolve.data;

  }).then(function(results){

    $scope.books.forEach(function(book){


    $scope.crit = {

    loveEct:0,
    violence:0,
    suspence:0,
    realism:0,
    horror:0,
    scienceFiction:0,
    supernaturalContent:0,
    readingLevel:0
    };


    book.reviews.forEach(function(item){

      if(item.attr["loveEct"]){
    $scope.crit.loveEct += Number(item.attr["loveEct"]);

      }
      if(item.attr["violence"]){

    $scope.crit.violence += Number(item.attr["violence"]);
      }
      if(item.attr["suspence"]){
    $scope.crit.suspence += Number(item.attr["suspence"]);
  }
      if(item.attr["realism"]){
      $scope.crit.realism += Number(item.attr["realism"]);
    }
      if(item.attr["horror"]){
    $scope.crit.horror += Number(item.attr["horror"]);
    }
      if(item.attr["scienceFiction"]){
    $scope.crit.scienceFiction += Number(item.attr["scienceFiction"]);
    }
      if (item.attr["supernaturalContent"]){
      $scope.crit.supernaturalContent += Number(item.attr["supernaturalContent"]);
    }
      if(item.attr["readingLevel"]){
    $scope.crit.readingLevel += Number(item.attr["readingLevel"]);

    }



    })


    for(var part in $scope.crit){
      // console.log(part, $scope.crit[part])
      if (book.reviews.length > 1){
  $scope.crit[part]= ($scope.crit[part])/(book.reviews.length)
  }

    }

var checker = function(){
  var matchCount = 0;

  for(var item in $scope.crit){
      if(item == "loveEct"){
            if(((lookingFor["loveEct"]-range) <= $scope.crit["loveEct"]) && ( $scope.crit["loveEct"]<= (lookingFor["loveEct"]+range))){
              matchCount +=1;
            }
      }
        if(item == "violence"){
            if((lookingFor["violence"]-range) <= $scope.crit["violence"] <= (lookingFor["violence"]+range)){
              matchCount +=1;
            }
          }
        if(item == "suspence"){
          if((lookingFor["suspence"]-range) <= $scope.crit["suspence"] <= (lookingFor["suspence"]+range)){
                matchCount +=1;
          }
        }
        if(item == "realism"){
          if((lookingFor["realism"]-range) <= $scope.crit["realism"] <= (lookingFor["realism"]+range)){
                matchCount +=1;
          }
        }
        if(item == "horror"){
          if((lookingFor["horror"]-range) <= $scope.crit["horror"] <= (lookingFor["horror"]+range)){
              matchCount +=1;
          }
        }
        if(item == "scienceFiction"){
          if((lookingFor["scienceFiction"]-range) <= $scope.crit["scienceFiction"] <= (lookingFor["scienceFiction"]+range)){
                matchCount +=1;
          }
        }
        if(item == "supernaturalContent"){
          if((lookingFor["supernaturalContent"]-range) <= $scope.crit["supernaturalContent"] <= (lookingFor["supernaturalContent"]+range)){
              matchCount +=1;
          }
        }
        if(item == "readingLevel"){
          if((lookingFor["readingLevel"]-range) <= $scope.crit["readingLevel"] <= (lookingFor["readingLevel"]+range)){
                matchCount +=1;
          }
        }

    }

    if(matchCount >= 5){
      book.averageReviews = $scope.crit;
    $scope.searchResults.push(book);
    }
}
checker();

})
})
for(var i = 0; i < $scope.searchResults.length; i++){
  $scope.searchResults[i].author = Array($scope.searchResults[i].author);

}

};




$scope.resetSeaches = function(){
$scope.showSearchFields = true;
$scope.enterInfo = true;
$scope.searchHappening = false;
$scope.lookingFor = {
  genre: "",
  violence: 0,
  loveEct: 0,
  suspence: 0,
  realism: 0,
  horror: 0,
  humor: 0,
  scienceFiction: 0,
  supernaturalContent: 0,
  readingLevel: 0
};

$scope.searchResults = [];


}


})
