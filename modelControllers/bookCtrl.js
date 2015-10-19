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

  getBookByName: function(req, res){
//is that okay to do?
    Book.find("name" : req.body.name)
    .then(function(err, book){
      if(err){
        res.status(500).send(err)
      }else {
        res.send(book);
      }
    });
  },

  getBook: function(req, res){

    Book.findById(req.query.id)
    .then(function(err, book){
      if(err){
        res.status(500).send(err)
      }else {
        res.send(book);
      }
    });
  },
//need to check

//
// addReview: function(req, res){
//   Book.findById(req.query.id).insert(req.body).save(function(err, data){
//     if(err){
//       res.status(500).send(err);
//     } else{
//       res.send(data)
//     }
//   });
// },

  makeReview: function(req, res){
    Book.find({'object_id': req.query.id})
    .then(function(err, book){
      book.reviews.push({
        reviewedBy: req.body.reviewedBy,
        attr: {
          violence: req.body.violence,
          loveEct: req.body.loveEct,
          suspence: req.body.suspence,
          realism: req.body.realism,
          horror: req.body.horror,
          humor: req.body.humor,
          scienceFiction: req.body.scienceFiction,
          supernaturalContent: req.body.supernaturalContent,
          understandability: req.body.understandability

        }

      }).save(function(err, data){
        if(err){
          res.status(500).send(err)
        }else {
          res.send(data);
        }
      })


    })
  }





}
