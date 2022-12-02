// const { urlencoded } = require('express');
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');
const connectDB = require('./dbconnection/connectDB');
const loginmodel = require('./model/schema');
const bookmodel = require('./model/adminschema');
const { ConnectionStates } = require('mongoose');
const { Console } = require('console');
connectDB();


const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"public");
const templates_path = path.join(__dirname,"./templates/views");
const partials_path = path.join(__dirname,"./templates/partials");

//middleware
app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use(bodyparser.urlencoded({ extended: false }));

//view engine use for type of engine we using
app.set('view engine', 'hbs');
app.set('views', templates_path);
hbs.registerPartials(partials_path);

// express.static is used to render html file
app.use(express.static(static_path));
// console.log(static_path);

app.post("/register",async (req,res)=>{
    try {
        const loginmodeldb = new loginmodel({
            username :  req.body.Email,
            password :  req.body.Password,
        })
    //     const user = await loginmodel.findOne({username:req.body.Email});
    //   res.json(user.username);
        await loginmodeldb.save();
        // const registeredmodel = await loginmodeldb.save();
        res.status(201).render("index");
        // console.log(req.body.Email);
        // console.log(req.body.Password);
        // res.send(req.body.Email);
        // res.send(req.body.Password);
    } catch (error) {
        res.status(400).send(error); 
    }
})

app.post("/login",async (req,res)=>{
        
    const email = req.body.email;
    const passwordhtml = req.body.password;
    console.log(passwordhtml)
    const result = await loginmodel.findOne({username: email});
    if(!result){
        res.send({msg:"invalid user"})
                
    }
    if(result.password !== passwordhtml)
    {
        res.send({msg:"invalid pass", result})
    }
    else
    {
        // res.redirect('../admin/admin.html')
        
        res.render('index',{user:result})
    }
})

app.post("/Admin",async (req,res)=>{
    try {
        const bookmodeldb = new bookmodel({
            bookname :  req.body.bookname,
            writer :  req.body.writer,
            discription :  req.body.discription,
            url :  req.body.url,
        })
    //     const user = await loginmodel.findOne({username:req.body.Email});
    //   res.json(user.username);
        await bookmodeldb.save();
        // res.send(req.body.url);
        // const registeredmodel = await loginmodeldb.save();
        res.status(201).render("index");
        // console.log(req.body.Email);
        // console.log(req.body.Password);
        // res.send(req.body.Email);
        // res.send(req.body.Password);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get("",async(req,res)=>{
    const timsalbook=await bookmodel.find()
    res.render('index',{user:timsalbook})
    // {user:timsalbook}
    // console.log(timsalbook)
    // console.log(timsalbook[0].bookname);
})

// ,{user:bookname},{user:writer},{user:discription},{user:url}

app.get("/about",(req,res)=>{
    
    res.render('about')
})

app.get("/Admin",async(req,res)=>{
    const timsalbook=await bookmodel.find()
    res.render('Admin',{user:timsalbook})
})

app.get("/login",(req,res)=>{
    res.render('login')
})

app.get("/register",(req,res)=>{
    res.render('register')
})


app.get("*",(req,res)=>{
    res.render('404error')
})

app.listen(port,()=>{
    console.log(`server is listening at port no. ${port}`)
})