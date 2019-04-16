const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
var mongoose =require('mongoose');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    mongoose.model('users').findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log({
            googleId: profile.id,
            username: profile.displayName
        });
        
        // check if user already exists in our own db
        mongoose.model('users').findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    type:'user',
                    googleId: profile.id,
                    name: profile.displayName
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);


passport.use(new LocalStrategy({
    usernameField: 'nameSignin',
    passwordField: 'password',
    session: true
  },
  function(username, password, done) {
      console.log("local");
      
        mongoose.model('users').findOne({name:username, password:password} , function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!(user.password === password) ) { return done(null, false); }
        return done(null, user);
      });
    }
  ));