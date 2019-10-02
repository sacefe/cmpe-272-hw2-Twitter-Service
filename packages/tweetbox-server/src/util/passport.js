import passport from 'passport';
import passportTwitter from 'passport-twitter';

passport.use(new passportTwitter.Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'oauth/callback',
    proxy: true //check value for prod.
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

export default passport;
