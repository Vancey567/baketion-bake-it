const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer', required: true }
}, { timestamps: true })

module.exports = mongoose.model('user', userScheme)