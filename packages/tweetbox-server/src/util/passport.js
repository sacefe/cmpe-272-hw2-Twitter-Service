import passport from 'passport';
import passportTwitter from 'passport-twitter';
import logger from './logger';
import User from '../models/user.model';
import { TWITTER } from './constants';

passport.use(new passportTwitter.Strategy({
    consumerKey: TWITTER.CONSUMER_KEY,
    consumerSecret: TWITTER.CONSUMER_SECRET,
    callbackURL: '/api/auth/twitter/callback',
    includeEmail: true,
    proxy: true //check value for prod.
}, function(token, tokenSecret, profile, done) {
    // logger.info(token, tokenSecret, profile);
    User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
        return done(err, user);
    });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

export default passport;
