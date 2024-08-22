import express from 'express';
import { editProfile, followOrUnfollow, getProfile, getSuggestedProfiles, Login, Logout, Register } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../middlewares/multer.js'

const Router = express.Router();

Router.route('/register').post(Register);
Router.route('/login').post(Login);
Router.route('/logout').get(Logout);
Router.route('/:id/profile').get(isAuthenticated , getProfile);
Router.route('/profile/edit').post(isAuthenticated , upload.single('profilePicture') , editProfile);
Router.route('/suggested').get(isAuthenticated , getSuggestedProfiles);
Router.route('/followorunfollow/:id').post(isAuthenticated,followOrUnfollow);



export default Router;