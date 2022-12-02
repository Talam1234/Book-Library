const express = require('express')
const bodyparser = require('body-parser')

let del = document.getElementById('del')
let rem = document.getElementById('rem')
let todo = document.getElementById('todo')

const bookmodel = require('./model/adminschema')
const app = express()

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: false }))


del.addEventListener('click',()=>{
  app.delete("/Admin",async(req,res)=>{
    await bookmodel.delete()
  })
})

rem.addEventListener('click',()=>{

})