import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addAComment, addAPost, deleteAPost, getAllPosts, getPostComments, getUserposts, likeAPost, saveAPost, unlikeAPost } from '../controllers/posts.controller.js';
import upload from '../middlewares/multer.js';

const Router = express.Router();

Router.route('/add').post(isAuthenticated ,upload.single('image'), addAPost);
Router.route('/delete/:id').post(isAuthenticated , deleteAPost);
Router.route('/allposts').get(isAuthenticated , getAllPosts);
Router.route('/userposts/all').get(isAuthenticated , getUserposts);
Router.route('/:id/like').get(isAuthenticated , likeAPost);
Router.route('/:id/unlike').get(isAuthenticated , unlikeAPost);
Router.route('/:id/comment').post(isAuthenticated , addAComment);
Router.route('/:id/comments/all').get(isAuthenticated , getPostComments);
Router.route('/:id/save').get(isAuthenticated , saveAPost);



export default Router;