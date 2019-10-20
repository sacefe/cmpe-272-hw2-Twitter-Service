import Twit from 'twit';
import logger from '../util/logger'
import { FRONTEND, TWITTER } from '../util/constants';
import userModel from '../models/user.model';


export const handleTwitterRedirect = async function(req, res, next) {
    res.redirect(`${FRONTEND.URL}/dashboard`);
    next();
}

export const sendMessageToUser = async function(req, res, next) {
    if(req.session.passport && req.session.passport.user){
        try {
            logger.info('user is logged in.');
            const {recipientId, message} = req.body;
            const twp = await userModel.findOne(
                    {_id: req.session.passport.user._id}
            ).select('twitterProvider');
            
            let msg = {
                event: {
                    type: "message_create",
                    message_create: {
                        target: {
                            recipient_id: recipientId
                        },
                        message_data: {
                            text: message
                        }
                    }
                }
            };
        const T = new Twit({
            consumer_key: TWITTER.CONSUMER_KEY,
            consumer_secret: TWITTER.CONSUMER_SECRET,
            access_token: twp.twitterProvider.token,
            access_token_secret: twp.twitterProvider.tokenSecret,
        });
        T.post('direct_messages/events/new', msg, (err, result, response) => {
            if(err){
                logger.error(err);
                res.status(500).json({
                    error: 'Something failed. Try again.'
                })
            }  else {
                logger.info(JSON.stringify(result));
                res.status(201).json({
                    message: 'Success.'
                })
                next();
            }
        })
        } catch(err) {
            logger.error(err);
            res.status(500).json({
                error: err
            });
            next(err);
        }
    }
}

// @roger
/**
 * @param {any} req (request object) 
 * @param {any} res (response object)
 * @param {any} next (next middleware function)
 * 
 */
export const getTweet = async (req, res, next) => {
    if(req.session.passport && req.session.passport.user) {
        try {
            logger.info('user is logged in.');
            const tweetID = req.params.id;
            const twp = await userModel.findOne(
                {_id: req.session.passport.user._id}
                ).select('twitterProvider');
            
            const T = new Twit({
                consumer_key: TWITTER.CONSUMER_KEY,
                consumer_secret: TWITTER.CONSUMER_SECRET,
                access_token: twp.twitterProvider.token,
                access_token_secret: twp.twitterProvider.tokenSecret,
            });
            T.get(`statuses/show/:id`,{id: tweetID}, (err, result, response) => {
                if(err) {
                    logger.error(JSON.stringify(err));
                    res.status(500).json({
                        error: 'Something failed. Try again.'
                    });
                    next(err);
                } else {
                    logger.info(JSON.stringify(result));
                    res.status(201).json({
                        message: result.text
                    })
                    next();
                }
            })
        } catch(err) {
            logger.error(err);
            res.status(500).json({
                error: err
            });
            next(err);
        }
    }
}

export const createTweet = async (req, res, next) => {
    if(req.session.passport && req.session.passport.user){
        try {
            logger.info('user is logged in.');
            const {message} = req.body;
            const twp = await userModel.findOne(
                    {_id: req.session.passport.user._id}
            ).select('twitterProvider');
            
        const T = new Twit({
            consumer_key: TWITTER.CONSUMER_KEY,
            consumer_secret: TWITTER.CONSUMER_SECRET,
            access_token: twp.twitterProvider.token,
            access_token_secret: twp.twitterProvider.tokenSecret,
        });
        T.post(`statuses/update`, {
            status: message
        }, (err, result, response) => {
            if(err) {
                logger.error(JSON.stringify(err));
                res.status(500).json({
                    error: 'Something failed. Try again.'
                });
                next(err);
            } else {
                logger.info(JSON.stringify(result));
                res.status(201).json({
                    message: 'Success.'
                })
                next();
            }
        })
    }catch(err) {
        logger.error(err);
        res.status(500).json({
            error: err
        });
        next(err);
    }
    }

}

// @sergio
export const deleteTweet = async (req, res, next) => {

}


