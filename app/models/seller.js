const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellerScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    story: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' }
}, { timestamps: true })

module.exports = mongoose.model('seller', sellerScheme)