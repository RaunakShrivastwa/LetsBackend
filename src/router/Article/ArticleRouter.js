import express from 'express';
import ArticleController from '../../controller/Article/ArticleController.js';
const { addArticle, getAllArticle, getArticleById, removeArticle, updateArticleId } = new ArticleController();

const router = express.Router();

router.post('/addArticle', addArticle);
router.get('/getArticleById/:id', getArticleById);
router.get('/getAllArticle', getAllArticle);
router.delete('/removeArticle/:id', removeArticle);
router.put('/modifyArticle/:id', updateArticleId);

export default router;