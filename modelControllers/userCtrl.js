var User = require('../models/userModel.js');
var mongoose = require('mongoose');

module.exports = {

  addUser: function(req, res){
    new User(req.body).save(function(err, data){
      if(error){
        res.status.send(err);
      } else {
        res.send(data);
      }

    });
  },

  getBooksReviewed: function(req, res){
    User.findById(req.params.id)
      .populate('booksReviewed')
        .exec(function(err, books){
          res.send(books);
    })

  },

  //
  getUser: function($q, $timeout){
    var deferred = $q.defer();
  return $http({
    method:"GET",
    url:"http://localhost:8881/api/user"
  }).then(function(res){
    deferred.resolve(res.data)
  })
  return deferred.promise;
},

  getGoogleUser: function(req, res){
    // console.log('REQ.USER', req.user.facebook, req.user.facebook.id);
    User.find({'google.id': req.user.google.id}, function(err, user){
      if(err){
        res.status(500).send(err);
      }else {
        res.send(user);
      }
    })

  },


  getFaceBookUser: function(req, res){
    // console.log('REQ.USER', req.user.facebook, req.user.facebook.id);
    User.find({'facebook.id': req.user.facebook.id}, function(err, user){
      if(err){
        res.status(500).send(err);
      }else {
        res.send(user);
      }
    })

  },

  reviewToAddToUser: function(req, res){
    User.findById(req.params.id, function(err, user){
      console.log(req.params.id, req.body.bookID)
      user.booksReviewed.push(new mongoose.Types.ObjectId(req.body.bookID));
      user.save(function(err, data) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      })
    })

  }



}
