import mongoose from "mongoose";

const schema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    linkdin: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    }
}, { timestamps: true });

const TestomonialSchema = mongoose.model('Testomonial',schema);
export default TestomonialSchema;