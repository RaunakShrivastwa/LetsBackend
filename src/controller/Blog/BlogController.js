import BlogSchema from "../../schema/Blog/BlogSchema.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import requestBody from "../../config/formData/formData.js";
import User from "../../schema/User/User.js";
dotenv.config();
export default class BlogContainer {
  // Add blog

  addBlog = async (req, res) => {
    try {
      const user = await User.findById(req.body.user);
      if (!user) {
        return res.status(404).json({ Error: "User not Found" });
      }
      const Blog = await BlogSchema.create(req.body);
      user.Blog.push(Blog);
      user.save();
      return res.status(201).json({ Blog });
    } catch (err) {
      return res.json({ Error: err });
    }
  };

  // Get all blog
  getAllBlog = async (req, res) => {
    try {
      const allBlog = await BlogSchema.find({});
      return res.status(200).json({
        allBlog,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something issue durning find all blog",
        error,
      });
    }
  };

  // Get blog by Id
  getBlogById = async (req, res) => {
    try {
      const blogData = await BlogSchema.findById(req.params.id);
      return res.status(200).json({
        blogData,
      });
    } catch (error) {
      return res.status(500).json({
        message: `We got error durning find the blog by id ${id}`,
        error,
      });
    }
  };

  // Remove blog from DB and cloudinary
  removeBlog = async (req, res) => {
    try {
      const blog = await BlogSchema.findByIdAndDelete(req.params.id);
      if (!blog) {
        return res.status(404).json({ Error: "Blog Does't exist" });
      }
      return res.status(200).json({ blog });
    } catch (error) {
      res.status(500).json({ message: "Error deleting image", error });
    }
  };

  // Update blog
  updateBlogId = async (req, res) => {
    try {
      const blogData = await BlogSchema.findById(req.params.id);
      if (!blogData)
        return res.status(404).json({
          Error: "Blog does't exist",
        });
      else {
        return res.status(200).json(
          await BlogSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          })
        );
      }
    } catch (error) {
      res.status(400).json({ message: "Error updating blog", error });
    }
  };
}
