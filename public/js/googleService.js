var app = angular.module('dateABook').service('googleService', function($http, hidden, $q){



  this.getBooksRegSearch = function(regSearchText, typeOfSearch){


var deferred = $q.defer();
    $http({
      method: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=in" + typeOfSearch + ":'" + regSearchText + "'",
      key: hidden.bookApiKey
    }).then(function(res){
      var parsedResponse = res.data.items;

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

        // var notThere ={
        //   notOnGoogle :
        //   author: '',
        //   title: '',
        //   publishDate: '',
        //   genre: ''
        // }
        //
        // formatedData.push(notThere);
      }
      deferred.resolve(formatedData);
      console.log (formatedData)
    });
    return deferred.promise;
  }

})

//
// var item = {
//   Author: parsedResponse[i].volumeInfo.authors,
//   Title: parsedResponse[i].volumeInfo.title,
//   Description: parsedResponse[i].volumeInfo.description,
//
//   image: (if(parsedResponse[i].volumeInfo.imageLinks.thumbnail){
//     parsedResponse[i].volumeInfo.imageLinks.thumbnail
//   }else{
//     "no Image"
//   }),
//
//   ImageLinkLarge: (if(parsedResponse[i].volumeInfo.imageLinks.large){
//     parsedResponse[i].volumeInfo.imageLinks.large
//   }else{
//     "no Image"
//   }),
//   previewLink: (if(parsedResponse[i].volumeInfo.previewLink){
//     parsedResponse[i].volumeInfo.previewLink
//   }else {
//     "no preview"
//   }),
//   category: parsedResponse[i].mainCategory
// }
