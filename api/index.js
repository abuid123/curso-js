const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abuid:Pipitequiero10@cluster0.iamow.mongodb.net/miapp?retryWrites=true&w=majority");

const User = mongoose.model("User", {
    username: String,
    edad: Number
});

const crear = async () => {
    const user = new User({username : "chanchito feliz", edad:25});
    const savedUser = await user.save();
    console.log(savedUser);
}

//crear();

const buscarTodo = async () => {
    const users = await User.find();
    console.log(users);
}

//buscarTodo();

const buscar = async () => {
    const user = await User.find({username:"chanchito feliz"});
    console.log(user);
}

//buscar();

const buscarUno = async () => {
    const user = await User.findOne({username:"chanchito feliz"});
    console.log(user);
}

//buscarUno();

const actualizar = async () => {
    const user = await User.findOne({username:"chanchito feliz"});
    console.log(user)
    user.edad = 30;
    await user.save();
    console.log(user);
}

//actualizar()

const eliminar = async () => {
    const user = await User.findOne({username:"chanchito triste"});
    if (user){
        await user.remove();
    }
    console.log("No existe");
}

//eliminar();