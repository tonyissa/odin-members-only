const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    msg: { type: String },
    timestamp: { type: Date, required: true }
});

module.exports = mongoose.model("Story", storySchema);