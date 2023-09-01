import mongoose, { Schema } from 'mongoose';

let schema = new Schema({
    title: String,
    content: String,
    url: String,
    bio: String,
    cat: [String],
    image: String,
    create_at: { type: Number, default: new Date() },
});

mongoose.models = {};
export default mongoose.model('post', schema);
