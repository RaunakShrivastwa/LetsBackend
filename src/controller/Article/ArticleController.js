import ArticleSchema from '../../schema/Article/ArticleSchema.js';
import User from '../../schema/User/User.js';

export default class ArticleController {

  addArticle = async (req, res) => {
    try {
      const user = await User.findById(req.body.user);
      if (!user) {
        return res.status(404).json({ Error: "User not Found" });
      }
      const article = await ArticleSchema.create(req.body);
      user.Articles.push(article);
      user.save();
      return res.status(201).json({ article });
    } catch (err) {
      return res.json({ Error: err });
    }
  };

  // Get all article
  getAllArticle = async (req, res) => {
    try {
      const allarticle = await ArticleSchema.find({});
      return res.status(200).json({
        allarticle,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something issue durning find all article",
        error,
      });
    }
  };

  // Get article by Id
  getArticleById = async (req, res) => {
    try {
      const articleData = await ArticleSchema.findById(req.params.id);
      return res.status(200).json({
        articleData,
      });
    } catch (error) {
      return res.status(500).json({
        message: `We got error durning find the article by id ${id}`,
        error,
      });
    }
  };

  // Remove article from DB and cloudinary
  removeArticle = async (req, res) => {
    try {
      const article = await ArticleSchema.findByIdAndDelete(req.params.id);
      if (!article) {
        return res.status(404).json({ Error: "article Does't exist" });
      }
      return res.status(200).json({ article });
    } catch (error) {
      res.status(500).json({ message: "Error deleting image", error });
    }
  };

  // Update article
  updateArticleId = async (req, res) => {
    try {
      const articleData = await ArticleSchema.findById(req.params.id);
      if (!articleData)
        return res.status(404).json({
          Error: "article does't exist",
        });
      else {
        return res.status(200).json(
          await ArticleSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          })
        );
      }
    } catch (error) {
      res.status(400).json({ message: "Error updating article", error });
    }
  };
};