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
            if(err) logger.error(err);
            logger.info(JSON.stringify(result));
            next();
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

const getMessages = (req, res, next) => {
    
}


