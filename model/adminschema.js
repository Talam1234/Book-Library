const mongoose = require('mongoose')

const bookdisplay = new mongoose.Schema({
    bookname : {
        type : String,
        required : true
    },
    writer : {
        type : String,
        required : true
    },
    discription : {
        type : String,
    },
    url : {
        type : String,
        required : true
    },
})
const bookmodel = mongoose.model('admindb',bookdisplay);

module.exports = bookmodel