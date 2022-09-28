const mongoose = require('mongoose')

const loginschema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique:true
    },
    password :  {
        type : String,
        required : true
    },
})
const loginmodel = mongoose.model('BookLibrary',loginschema);

module.exports = loginmodel


