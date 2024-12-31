import express from 'express';
import BlogRouter from './Blog/BlogRouter.js';
import ArticleRouter from './Article/ArticleRouter.js';
import TestomonialRouter from './Testomonial/TestomonialRouter.js';
import userRouter from './userRouter/userRouter.js';
import authRouter from './Auth/AuthRouter.js';
import projectRouter from '../router/projectRouter/projectRouter.js'

const router = express.Router();

router.use('/blog', BlogRouter);
router.use('/article', ArticleRouter);
router.use('/testomonial', TestomonialRouter);
router.use('/user',userRouter);
router.use('/auth',authRouter);
router.use('/project',projectRouter);


export default router;