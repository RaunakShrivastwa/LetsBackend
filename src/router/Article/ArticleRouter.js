import express from 'express';
import ArticleController from '../../controller/Article/ArticleController.js';
import verifyToken from '../../Auth/Verifytoken.js';
const { addArticle, getAllArticle, getArticleById, removeArticle, updateArticleId } = new ArticleController();

const router = express.Router();

router.post("/addArticle", verifyToken, addArticle);
router.get("/getArticleById/:id", verifyToken, getArticleById);
router.get("/getAllArticle", verifyToken, getAllArticle);
router.delete("/removeArticle/:id", verifyToken, removeArticle);
router.put("/modifyArticle/:id", verifyToken, updateArticleId);

export default router;