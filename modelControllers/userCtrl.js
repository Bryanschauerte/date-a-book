var User = require('../models/userModel.js');

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

  //
  getUser : function($q, $timeout){
    var deferred = $q.defer();
  return $http({
    method:"GET",
    url:"http://localhost:8881/api/user"
  }).then(function(res){
    deferred.resolve(res.data)
  })
  console.log(deferred.promise);
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

  }



}
