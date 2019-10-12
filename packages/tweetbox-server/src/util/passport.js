import passport from 'passport';
import {config} from 'dotenv';
import passportTwitter from 'passport-twitter';
import logger from './logger';

config({
    path: `./environments/${process.env.NODE_ENV}.env`
});

passport.use(new passportTwitter.Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/api/auth/twitter/callback',
    proxy: true //check value for prod.
}, function(token, tokenSecret, profile, done) {
    logger.info(token, tokenSecret, profile);
    done();
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

export default passport;
