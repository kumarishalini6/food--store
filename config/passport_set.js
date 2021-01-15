const GoogleStrategy=require('passport-google-oauth20').Strategy
const usr=require('../api/model/sche');
const passport=require('passport')


passport.use(new GoogleStrategy({
    clientID:"387110656783-tih02e7oehen4pc0i31ec69r3bc58ut8.apps.googleusercontent.com",
    clientSecret:'54aSG7qjrwNWq1SIJiVSZaga',
    callbackURL:"http://localhost:2000/users/google/auth/callback"
},()=>{}

));
