const express = require('express')
const mongoose = require('mongoose')
const User = require('./user')
const {Auth,isAuthenticated} = require('./auth.controller')

mongoose.connect("mongodb+srv://abuid:Pipitequiero10@cluster0.iamow.mongodb.net/auth?retryWrites=true&w=majority")

const app = express()
app.use(express.json())


app.get("*",(req,res)=>{
    res.status(404).sendFile(`${__dirname}/404.html`);
});

app.post('/register', Auth.register)

app.post('/login', Auth.login)


app.listen(3000,()=>{
    console.log('Api listening in port 3000')
})