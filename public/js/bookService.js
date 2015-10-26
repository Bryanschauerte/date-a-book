var app = angular.module('dateABook').service('bookService', function($http, $q){





this.getBookIdFromTitle  = function(bookTitle){
  return $http({
    method: 'GET',
    url:"/api/bookName/" +bookTitle

  });

},

this.getAllBooks = function(){
  return $http({
    method: "GET",
    url:"/api/book/"
  })

},

this.getBookFromId = function(bookId){
  return $http({
    method: "GET",
    url:"/api/book/" +bookId
  })

},



//need to do two
this.addBook = function(title, author, genre, image, description, publishDate){


    return $http({
      method: "POST",
      url:"/api/book",
      data: {
        title: title,
    		author: author,
    		genre: genre,
    		image: image,
    		description: description,
    		publishDate: publishDate

      }
    })

},


//this plus doer
  this.addReview = function( bookID, violence, loveEct, suspence, realism, horror, humor, scienceFiction, supernaturalContent, readingLevel){
    return $http({
      method: "PUT",
      url:"/api/book/" +bookID,
      data: {

attr: {
        violence: violence,
        loveEct: loveEct,
        suspence: suspence,
        realism: realism,
        horror: horror,
        humor: humor,
        scienceFiction: scienceFiction,
        supernaturalContent: supernaturalContent,
        readingLevel: readingLevel
}
      }
    })
  },

  this.addBookReviewDoer = function(userID, bookID){

    return $http({
      method: "PUT",
      url:"/api/bookReviewer/" +bookID,
      data: {
        userID: userID
      }
    })
  }







});
