import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';

const Router = express.Router();

Router.route('/send/:id').post(isAuthenticated , sendMessage);
Router.route('/all/:id').get(isAuthenticated , getMessage);



export default Router;