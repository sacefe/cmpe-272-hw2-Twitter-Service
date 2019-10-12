
import {Router} from 'express';
import { getApiStatus } from '../controllers/api.controller';
import passport from '../util/passport';
// import { handleResponseFromTwitter } from '../controllers/twitter.controller';

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
 * @route /api/users
 * @returns User/User[]
 * @methods GET, POST
 ****************************************************************************/
// router.route('/users')
//         .get()
//         .post();

// router.route('/users/${id}')
//         .get()
//         .put();

/**
 * @route /auth
 * @returns authenticates users.
 * @methods GET, POST
 */
router.route('/auth/twitter')
        .get(passport.authenticate('twitter'));

router.route('/auth/twitter/callback')
// Replace this with client URL env variable later.
        .get(passport.authenticate('twitter', { failureRedirect: 'http://localhost:8080/login-failed' }));

export default router;
