var Book = require('../models/userModel.js');

module.exports = {

  addBook: function(req, res){
    new Book(req.body).save(function(err, data){
      if(error){
        res.status.send(err);
      } else {
        res.send(data);
        }

    });
  },

  addReview: function(req, res){
    Book.findById(req.query.id).insert(req.body).save(function(err, data){
      if(err){
        res.status(500).send(err);
      } else{
        res.send(data)
      }
    });
  },

  getBook: function(){

    Book.findById(req.query.id)
    .then(function(err, book){
      if(err){
        res.status(500).send(err)
      }else {
        res.send(data);
      }
    });
  },

  editBook: function(){

    
  }



}
