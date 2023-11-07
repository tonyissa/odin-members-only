function blur(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
        // Uppercase letters
        result += String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
        // Lowercase letters
        result += String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
        } else {
        // Non-alphabetic characters remain unchanged
        result += str.charAt(i);
        }
    }
    return result;
}

module.exports = blur;