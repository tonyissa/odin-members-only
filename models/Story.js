const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: String, maxLength: 200, required: true },
    timestamp: { type: Date, required: true }
});

module.exports = mongoose.model("Story", storySchema);