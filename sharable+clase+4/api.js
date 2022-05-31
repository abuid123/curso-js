const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Animal = require('./animal.controller')
const {Auth,isAuthenticated} = require('./auth.controller')
const User = require('./user')
const port = 3000

mongoose.connect("mongodb+srv://abuid:Pipitequiero10@cluster0.iamow.mongodb.net/auth?retryWrites=true&w=majority")

app.use(express.json())

app.get('/animals', isAuthenticated,Animal.list)
app.post('/animals',isAuthenticated, Animal.create)
app.put('/animals/:id', isAuthenticated,Animal.update)
app.patch('/animals/:id', isAuthenticated,Animal.update)
app.delete('/animals/:id', isAuthenticated,Animal.destroy)
app.post('/register', Auth.register)
app.post('/login', Auth.login)


app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get("*",(req,res)=>{
    res.status(404).sendFile(`${__dirname}/404.html`);
});


app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
