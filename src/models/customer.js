const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    token: {
        type: String
    }, 
    number: {
        type: Number
    }
}, {
    timestamps: true
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer