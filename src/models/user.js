import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
    fullname: String,
    email: { type: String, required: true },
    password: String,

    create_at: { type: Number, default: new Date() },
});

mongoose.models = {};
export default mongoose.model('user', schema);