const express = require('express')
const mongoose = require('mongoose')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { expressjwt: expressJwt } = require("express-jwt");
const User = require('./user')
const config = require('./config.js');

mongoose.connect("mongodb+srv://abuid:Pipitequiero10@cluster0.iamow.mongodb.net/auth?retryWrites=true&w=majority")

const app = express()
app.use(express.json())

//forma corta de crear un objeto es simplemente pasarle la propiedad yesta crea la propiedad con ese nombre 
// y el contenido de esta misma

const signToken = (_id)=> jwt.sign({_id},`${config.SECRET}`)
const validateJwt = expressJwt({secret:`${config.SECRET}`,algorithms:['HS256']})
const findAndAssingUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.auth._id)
        if(!user){
            return res.status(401).end()
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

app.get("*",(req,res)=>{
    res.status(404).sendFile(`${__dirname}/404.html`);
});

app.post('/register', async (req,res)=>{
    const {body} = req
    try {
        const isUser = await User.findOne({email:body.email})
        if(isUser){
            return res.status(403).send('User already exists')
        }
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(body.password,salt)
        const user = await User.create({email:body.email, password: hashed, salt})

        const signed = signToken(user._id)

        res.status(201).send(signed)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
})

app.post('/login', async (req,res)=>{
    const {body} = req
    try {
        const user = await User.findOne({email:body.email})
        if(!user){
            res.status(403).send("Mail invalido")
        }else{
            const isMatch = await bcrypt.compare(body.password,user.password)
            if(isMatch){
                const signed = signToken(user._id)
                res.status(200).send(signed)
            }else{
                res.status(403).send("Contraseña invalida")
            }
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

const isAuthenticated = express.Router().use(validateJwt,findAndAssingUser)

app.get('/lele',isAuthenticated ,(req,res)=>{
    throw new Error('Nuevo error')
    res.send(req.user)
})

app.use((err,req,res,next)=>{
    console.error('Mi nuevo error',err.stack)
    next(err)
})

app.use((err,req,res,next)=>{
    res.send('Ha ocurrido un error :c')
})

app.listen(3000,()=>{
    console.log('Api listening in port 3000')
})