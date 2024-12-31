import express from 'express';
import BlogController from '../../controller/Blog/BlogController.js';
const { addBlog, getAllBlog, getBlogById, removeBlog, updateBlogId } = new BlogController();
const router = express.Router();
router.post('/addBlog',addBlog);
router.get('/getBlogById/:id', getBlogById);
router.get('/getAllBlog', getAllBlog);
router.delete('/removeBlog/:id',removeBlog);
router.patch('/modifyBlog/:id',updateBlogId);

export default router;