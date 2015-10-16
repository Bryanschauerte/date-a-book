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

  getUser: function(req, res){
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
