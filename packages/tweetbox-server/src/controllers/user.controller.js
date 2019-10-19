import logger from '../util/logger';
import User from '../models/user.model';

export const getUser = async (req, res, next) => {
    if(req.session.passport && req.session.passport.user) {    
    try {
            const user = await User.findOne({ _id: `${req.session.passport.user._id}` });
            await logger.info(user);
            await res.status(202).json({
                user: user
            });
            return next();
        } catch (err) {
            res.status(500);
            return next(err);
        }
    }
}
