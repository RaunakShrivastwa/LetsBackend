import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const CareerSchema = mongoose.model('Career', schema);
export default CareerSchema;