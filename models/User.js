const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blur = require('../modules/blur');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    membership: { type: String, enum: ["Unregistered", "Member", "Admin"] }
});

userSchema.virtual('blurryUsername').get(function() {
    return blur(this.username);
})

module.exports = mongoose.model("User", userSchema);