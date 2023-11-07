const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    membership: { type: String, enum: ["Unregistered", "Member", "Admin"] }
});

userSchema.virtual('blurry').get(function() {
    var result = "";
    for (var i = 0; i < this.username.length; i++) {
    var charCode = this.username.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
        // Uppercase letters
        result += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
        // Lowercase letters
        result += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
        } else {
        // Non-alphabetic characters remain unchanged
        result += this.username.charAt(i);
        }
  }
  return result;
})

module.exports = mongoose.model("User", userSchema);