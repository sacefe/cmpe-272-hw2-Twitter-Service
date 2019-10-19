import logger from '../util/logger';
import { FRONTEND, ERRORS } from '../util/constants';

export const checkAuth = (req, res, next) => {
    if(req.session.passport && req.session.passport.user) {
        logger.info(JSON.stringify(req.session));
        res.cookie('LOGGED-IN', 'true');
        next();
    } else {
        res.cookie('LOGGED-IN', 'false');
        res.status(401).json({
            error: 'You\'re not logged in.',
            code: ERRORS.NOT_LOGGEDIN
        });
    }
}