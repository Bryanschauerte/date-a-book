var Book = require('../models/bookModel.js');
var mongoose = require('mongoose');

module.exports = {

  getAllBooks: function(req, res){
    Book.find({},
      function(err, book){
        if(err){
          res.status(500).send(err)
        }else {
          res.send(book);
        }
      });
    },


  addBook: function(req, res){
    new Book(req.body).save(function(err, data){
      if(err){
        res.status(500).send(err);
      } else {
        res.send(data);
        }

    });
  },

  getBookByName: function(req, res){
    Book.find({'title': req.params.id},
      function(err, book){
        if(err){
          res.status(500).send(err)
        }else {
          res.send(book);
        }
      });
  },

  getBook: function(req, res){

    Book.findById(req.params.id)
    .then(function(err, book){
      if(err){
        res.status(500).send(err)
      }else {
        res.send(book);
      }
    });
  },


  makeReview: function(req, res) {
    Book.findById(req.params.id, function( err, book ) {
      if(err){
        res.send(err);
      }
      //here
      book.reviews.push(req.body);
        book.save(function(err, data) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(data);
          }
        })
    })
  },

  addReviewDoer: function(req, res) {
    Book.findById(req.params.id, function( err, book ) {
      book.reviewedBy.push(new mongoose.Types.ObjectId(req.body.userID));
      book.save(function(err, data) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      })
    })
  }





}
