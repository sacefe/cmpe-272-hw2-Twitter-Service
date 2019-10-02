import {Router} from 'express';
import { getApiStatus } from '../controllers/api.controller';

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
router.route('/users')
        .get()
        .post();

router.route('/users/${id}')
        .get()
        .put();


router.route('/twitter/authenicate')
        .post();

export default router;
