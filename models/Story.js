const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blur = require('../modules/blur');

const storySchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    msg: { type: String },
    timestamp: { type: Date, required: true }
});

storySchema.virtual('blurryMsg').get(function() {
    return blur(this.msg);
})

module.exports = mongoose.model("Story", storySchema);