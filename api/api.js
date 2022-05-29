//require para importar la dependencia pasada como parametro
const express = require("express");
const user = require("./user.controller");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

//esto agarra todas las peticiones que vienen en formato de json
//las va a transformar en un obj js y las va a asignar
//a la propiedad de body
app.use(express.json());
mongoose.connect("mongodb+srv://abuid:Pipitequiero10@cluster0.iamow.mongodb.net/miapp?retryWrites=true&w=majority");

//req = request(peticion)
//res = response(respuesta enviada al usuario);
app.get("/users", user.list);
app.post("/users",user.create);
app.put("/users/:id",user.update);
app.get("/users/:id",user.get);
app.patch("/users/:id",user.update);
app.delete("/users/:id",user.destroy);


//__dirname lo que hace es indicar en que carpeta se esta ejecutando el api.js
app.get("/", (req,res)=>{
    console.log(__dirname);
    res.sendFile(`${__dirname}/index.html`);
})

//200 cuando esta ok y ademas quiero devolver datos GET
//201 cuando esta ok y CREADO POST
//204 cuando esta ok y NO CONTENT PUT PATCH DELETE

app.get("*",(req,res)=>{
    res.status(404).send("esta pagina no existe");
});

app.listen(port,()=>{
    console.log("Arrancando la aplicacion");
});

