var express = require('express'),
	app = express(),
	port = 8881,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	passport = require('passport'),
	User = require('./models/userModel'),
	secrets = require('./hidden.js'),
	session = require('express-session'),
	GoogleStrategy = require('passport-google-oauth2').Strategy,
	FacebookStrategy = require('passport-facebook').Strategy,
	goauth2 = require("google-oauth2");


//controllers for models
var userCtrl = require('./modelControllers/userCtrl.js'),
		bookCtrl = require('./modelControllers/bookCtrl.js');


app.use(express.static(__dirname + "/public"));

//session middleware
app.use(session({secret: "BananaMonk"}));

//initiating passport
app.use(passport.initialize());
//use passport session

app.use(passport.session());

////google Strategy


	passport.use(new GoogleStrategy({

		clientID: secrets.googleAppId,
		clientSecret: secrets.googleClientSecret,
		callbackURL: secrets.googleCallback

	}, function( token, refreshToken, profile, done ) {
		process.nextTick(function() {

			User.findOne({'google.id': profile.id}, function(err, user){
				console.log(profile);
				if (err) {
                return done(err);
            }
				if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                google: profile._json
            });
						console.log(234234324, user);
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            //found user. Return
						console.log("user", user)
            return done(err, user);
        };


		});
		})
	}))

/////////
////FacebookStrategy///
///////

passport.use(new FacebookStrategy({
  clientID: secrets.facebookAppId,
  clientSecret: secrets.facebookClientSecret,

  callbackURL: 'http://localhost:8881/auth/facebook/callback',
	profileFields: ['id', 'emails', 'name']
	},
		function(token, refreshToken, profile, done) {
			User.findOne({'facebook.id': profile.id}, function(err, user){
				if (err) {
                return done(err);
            }
				if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                facebook: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            //found user. Return
						console.log("user", user)
            return done(err, user);
        };


		});
	}
));


//google ENDPOINTS

//try= removed scope after google, , { scope: ['profile', 'email'] }

	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//try = added a callback to cl the res
	app.get('/api/google/callback', passport.authenticate('google', {
		successRedirect: '/#/pastReads',
		failureRedirect: '/login'
	}), function(req, res){
		console.log(res);
	}
);

//facebook ENDPOINTS
// app.get('/auth/facebook/', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/facebook/', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	 successRedirect: '/#/pastReads',//reslove on route (front end) that would do another get req that returns the user
	 failureRedirect: '/login'
 }), function(req, res) {
	 console.log(req.user);
 });

 // app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res) {
 // 	 console.log(1212121212, req.user);
 //  res.json(req.user)
 //  });

 app.put('/api/user', userCtrl.addUser);
 app.put('/api/book', bookCtrl.addBook);

 app.put('/api/book', bookCtrl.editBook);

 //get/reslove/then/scope setting
app.get('/api/user', userCtrl.getUser);



passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(obj, done) {
 done(null, obj);
});


var mongoPort = process.env.MONGO_PORT || 27017;
var mongoURI  = 'mongodb://localhost:' + mongoPort + '/dateABook';





mongoose.connect(mongoURI);
mongoose.connection.once('open', function(){
  console.log('Mongoose connected on ' + mongoPort);
});

app.listen(port, function(){
  console.log("listening on port: " + port);
});




//
// app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res) {
// 	console.log(1212121212, req.user);
// 	res.json(req.user) the thing making the call in te front end, .then(function(err, date){ scope.user = data})
//  });    get inpoint that returns the json object. use user = res.body
