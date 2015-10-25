var app = angular.module('dateABook').service('googleService', function($http, hidden, $q){



  this.getBooksRegSearch = function(regSearchText, typeOfSearch){


var deferred = $q.defer();
    $http({
      method: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=in" + typeOfSearch + ":'" + regSearchText + "'",
      key: hidden.bookApiKey
    }).then(function(res){
      var parsedResponse = res.data.items;
      if(parsedResponse == undefined){
        parsedResponse =[];
      }

      var formatedData = [];
      for(var i = 0; i < parsedResponse.length; i ++){
        var item = {
          author: parsedResponse[i].volumeInfo.authors,
          title: parsedResponse[i].volumeInfo.title,
          description: parsedResponse[i].volumeInfo.description,
          publishDate: parsedResponse[i].volumeInfo.publishedDate,
          //  ImageLinkLarge: parsedResponse[i].volumeInfo.imageLinks.large,
          previewLink: parsedResponse[i].volumeInfo.previewLink,
          genre: parsedResponse[i].mainCategory
        }
        formatedData.push(item);

      }
      deferred.resolve(formatedData);
    }, function(err){
      return "none";
    });
    return deferred.promise;
  }

})
