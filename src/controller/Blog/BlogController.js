import BlogSchema from "../../schema/Blog/BlogSchema.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import requestBody from "../../config/formData/formData.js";
dotenv.config();
export default class BlogContainer {
  // Add blog

  addBlog = async (req, res) => {
    try {
      const { fields, files } = await requestBody(req);
      if (files?.imageUrl[0]?.filepath) {
        const image = await cloudinary?.uploader?.upload(
          files?.imageUrl[0]?.filepath
        );
        fields.imageUrl = image.url;
        fields.imagePublicId = image.public_id;
        fields.imageSecureUrl = image.secure_url;
      }
      return res.json(await BlogSchema.create(fields));
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
      // Find the blog entry by ID
      const blog = await BlogSchema.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Remove the image from Cloudinary using the public ID
      const result = await cloudinary.uploader.destroy(blog.imagePublicId);

      if (result.result !== "ok") {
        return res
          .status(400)
          .json({ message: "Failed to delete image from Cloudinary" });
      }

      // Remove the blog entry from the database if the image is successfully deleted
      await BlogSchema.findByIdAndDelete(blog);

      res
        .status(200)
        .json({ message: "Blog and image deleted successfully", result });
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
          message: "Blog does't exist",
        });
      else {
        const form = formidable();
        // Object to store parsed fields
        const parsedFields = {};
        form.on("field", (name, value) => (parsedFields[name] = value));
        form.parse(req, async (err, fields, files) => {
          if (err) {
            return res.status(501).json({ message: `Unable to parse ${err}` });
          }
          if (files?.image) {
            const result = await cloudinary.uploader.destroy(
              blogData.imagePublicId
            );
            let imgData = await cloudinary.uploader.upload(
              files.image[0].filepath
            );

            parsedFields.imageUrl = imgData.url;
            parsedFields.public_id = imgData.public_id;
            parsedFields.imageSecureUrl = imgData.secure_url;
          }
          return res.status(200).json(
            await BlogSchema.findByIdAndUpdate(req.params.id, parsedFields, {
              new: true,
            })
          );
        });
      }
    } catch (error) {
      res.status(400).json({ message: "Error updating blog", error });
    }
  };
}
