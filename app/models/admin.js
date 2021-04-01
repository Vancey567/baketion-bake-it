const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    productType: { type: String, required: true },
    role: { type: String, default: 'admin' }
}, { timestamps: true })

module.exports = mongoose.model('admin', adminScheme)