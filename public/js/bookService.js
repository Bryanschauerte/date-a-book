var app = angular.module('dateABook').service('booksService', function($http, $q){





this.getBookIdFromTitle  = function(bookTitle){
  return http({
    method: 'GET',
    url:"http://localhost:8881/api/book",
    data: {
      name: bookTitle
    }
  });

}



//need to do two
this.addBook = function(title, author, genre, image, description, publishDate){


    return $http({
      method: "POST",
      url:"http://localhost:8881/api/book",
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



  this.addReview = function(userID, bookID, violence, loveEct, suspence, realism, horror, humor, scienceFiction, supernaturalContent, understandability){
    return $http({
      method: "POST",
      url:"http://localhost:8881/api/book/" +bookID,
      data: {

        userID: userID,
        violence: violence,
        loveEct: loveEct,
        suspence: suspence,
        realism: realism,
        horror: horror,
        humor: humor,
        scienceFiction: scienceFiction,
        supernaturalContent: supernaturalContent,
        understandability: understandability

      }
    })
  }

//above  these two need to be done to add a book and the reviews to the book




});
