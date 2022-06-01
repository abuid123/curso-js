const express = require('express')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { expressjwt: expressJwt } = require("express-jwt");
const User = require('./user')
const config = require('./config.js');

const validateJwt = expressJwt({secret:`${config.SECRET}`,algorithms:['HS256']})
const signToken = (_id)=> jwt.sign({_id},`${config.SECRET}`)

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

const isAuthenticated = express.Router().use(validateJwt,findAndAssingUser)


const Auth = {
    login: async (req, res)=>{
        const {body} = req
        try {
            const user = await User.findOne({email:body.email})
            if (!user) {
                res.status(401).send('Usuario y/o contraseña invalida')
            }
            const isMatch = await bcrypt.compare(body.password, user.password)
            if(isMatch){
                const signed = signToken(user._id)
                res.status(200).send(signed)
            }else{
                res.status(401).send('Usuario y/o contraseña invalida')
            }
        } catch (error) {
            res.status(505).send(error.message)
        }
    },
    register: async (req,res)=>{
        const {body} = req
        try {
            const user = await User.findOne({email:body.email})
            if(user){
                res.send('Usuario ya existe')
            }else{
                const salt = await bcrypt.genSalt()
                const hashed = await bcrypt.hash(body.password,salt)
                const user = await User.create({email:body.email, password: hashed, salt})

                const signed = signToken(user._id)
        
                res.status(201).send(signed)
            }
        } catch (error) {
            res.status(500).send(err.message)
        }
    },
}

module.exports = {Auth, isAuthenticated}