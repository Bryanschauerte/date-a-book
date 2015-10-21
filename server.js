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
//the user of the session
var thisUser ={}
//controllers for models
var userCtrl = require('./modelControllers/userCtrl.js'),
		bookCtrl = require('./modelControllers/bookCtrl.js');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(session({secret: "BananaMonk"}));
app.use(passport.initialize());
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
						console.log("user", user);
						thisUser.userInfo = user;


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
						thisUser.userInfo = user;
            return done(err, user);
        };


		});
	}
));

	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

	app.get('/api/google/callback', passport.authenticate('google', {
			successRedirect: '/#/pastReads',
			failureRedirect: '/login'
		}), function(req, res){
			console.log(res);
		}
	);

app.get('/auth/facebook/', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	 successRedirect: '/#/pastReads',
	 failureRedirect: '/login'
 }), function(req, res) {
	 console.log(req.user);
 });

 app.put('/api/user', userCtrl.addUser);
 app.get('/api/user', function(req, res){
	 res.send(thisUser);
})
 app.get('/api/user/facebook', userCtrl.getFaceBookUser);
 app.get('/api/user/google', userCtrl.getGoogleUser);
 app.get('/api/book/:id', bookCtrl.getBook);
 app.get('/api/bookName/:id', bookCtrl.getBookByName);
 app.post('/api/book', bookCtrl.addBook);
 app.put('/api/book/:id', bookCtrl.makeReview);
 app.put('/api/bookReviewer/:id', bookCtrl.addReviewDoer);




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
