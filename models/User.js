const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    membership: { type: String, enum: ["Unregistered", "Member", "Admin"] }
});

userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
})

module.exports = mongoose.model("User", userSchema);