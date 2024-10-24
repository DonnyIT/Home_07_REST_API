const mongoose = require('mongoose')
const type = require('node-models/type')
const Schema = mongoose.Schema

const userShema = new Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    }

})

module.exports = mongoose.model('users', userShema)