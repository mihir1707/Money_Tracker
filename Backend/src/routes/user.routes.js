import { Router } from 'express';
import { deleteUser, getProfile, loginUser, logoutUser, registerUser, updateProfile } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.js';


const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(verifyJWT, getProfile).put(verifyJWT, updateProfile).delete(verifyJWT, deleteUser);
router.route('/logout').post(verifyJWT, logoutUser);

export default router;