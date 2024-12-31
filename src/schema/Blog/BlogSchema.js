import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        // required: true
    },
    imagePublicId: {
        type: String,
        // required: true
    },
    imageSecureUrl: {
        type: String,
        // required: true
    }
}, {
    timestamps: true
});

const BlogSchema = mongoose.model('Blog', schema);
export default BlogSchema;