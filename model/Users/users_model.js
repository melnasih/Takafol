const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, "Please add the id "]
    },
    firstName: {
        type: String,
        required: [true, "Please add the first name "]
    },
    lastName: {
        type: String,
        required: [true, "Please add the last name "]
    },
    username: {
        type: String,
        required: [true, "Please add the username "],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add the password "],
    },
    marketingConsent: {
        type: Boolean,
        required: [true, "Please specify marketingConsent status"]
    },
    email: {
        type: String,
        required: [true, "Please add the email "]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);