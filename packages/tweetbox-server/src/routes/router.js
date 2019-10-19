
import {Router} from 'express';
import { getApiStatus } from '../controllers/api.controller';
import passport from '../util/passport';
import { handleTwitterRedirect, sendMessageToUser } from '../controllers/twitter.controller';
import {getUser} from '../controllers/user.controller';
import { FRONTEND } from '../util/constants';
import { checkAuth } from '../controllers/auth.controller';

/**
 * @author Achalaesh Lanka <me@terasurfer.com>
 */
const router = Router();

 /*****************************************************************************
  * @route /api
  * @returns api list.
  * @methods GET.
  ****************************************************************************/
router.route('')
        .get(getApiStatus);

/*****************************************************************************
 * @route /api/user
 * @returns User
 * @methods GET
 ****************************************************************************/
router.route('/user')
        .get(checkAuth, getUser);

/**
 * @route /auth
 * @returns authenticates users.
 * @methods GET, POST
 */
router.route('/auth/twitter')
        .get(passport.authenticate('twitter'));

router.route('/auth/twitter/callback')
// Replace this with client URL env variable later.
        .get(passport.authenticate(
                'twitter',
                { failureRedirect: `${FRONTEND.URL}/login-failed` }
                ),
                checkAuth,
                handleTwitterRedirect
        );
// ----------------------------------------------------------------------------
/**
 * Twitter req apis
 */
router.route('/twitter/direct-message')
                .post(checkAuth, sendMessageToUser);

export default router;
