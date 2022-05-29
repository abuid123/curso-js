const Users = require("./User");
const User = {
    list: async (req,res)=>{
        const users = await Users.find();
        res.status(200).send(users);
    },
    get: async (req,res)=>{
        const { id } = req.params;
        const users = await Users.findOne({_id: id});
        res.status(200).send(users);
    },
    create: async (req,res)=>{
        const user = new Users(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser._id);
    },
    update: async (req,res)=>{
        const {id} = req.params;
        const user = await Users.findOne({_id:id});
        Object.assign(user,req.body);
        await user.save();
        res.sendStatus(204);
    },
    destroy: async (req,res)=>{
        const {id} = req.params;
        const user = await Users.findOne({_id:id});
        if(user){
            await user.remove();
        }
        res.sendStatus(204);
    }
};

//cuando importemos vamos a recibir lo q exportemos debajo
module.exports = User;