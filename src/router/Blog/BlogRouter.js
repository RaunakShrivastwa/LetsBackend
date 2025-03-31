import express from 'express';
import BlogController from '../../controller/Blog/BlogController.js';
import verifyToken from '../../Auth/Verifytoken.js';
const { addBlog, getAllBlog, getBlogById, removeBlog, updateBlogId } = new BlogController();
const router = express.Router();
router.post("/addBlog", verifyToken, addBlog);
router.get("/getBlogById/:id", verifyToken, getBlogById);
router.get("/getAllBlog", verifyToken,getAllBlog);
router.delete("/removeBlog/:id", verifyToken, removeBlog);
router.put("/modifyBlog/:id", verifyToken, updateBlogId);

export default router;