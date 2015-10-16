var app = angular.module('dateABook').service('googleService', function($http, hidden, $q){

this.formatData = function(data){
  return {

    Author: data.volumeInfo.authors,
    Title: data.volumeInfo.title,
    Description: data.description,
    ImageLinkMed: data.imageLinks.medium,
    ImageLinkMed: data.imageLinks.large,
    category: data.mainCategory



  }

},



  this.getBooksRegSearch = function(regSearchText, critera){
console.log(regSearchText);

var deferred = $q.defer();

    return $http({
      method: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=intitle:'" + regSearchText + "'",
      key: hidden.bookApiKey
    }).then(function(res){
      var parsedResponse = res.data
      console.log(parsedResponse);

      var formatedData = [];
      for(var i = 0; i < parsedResponse.length; i ++){
        formatedData.push(this.formatedData(parsedResponse[i]))
      }
      deferred.resolve(formatedData);
    }.bind(this));



    return deferred.promise;

  }

})
