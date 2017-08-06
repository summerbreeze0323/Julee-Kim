var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    salt: String
});

mongoose.model('users', userSchema);