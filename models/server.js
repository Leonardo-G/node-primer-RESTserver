const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.usuariosPath = "/api/usuarios"; 
        this.authPath = "/api/auth";
        this.categoriaPath = "/api/categorias";
        this.productosPath = "/api/productos";

        //Conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use( cors() );

        //Lectura y parse del body
        this.app.use( express.json() ); 

        //Directorio publico
        this.app.use( express.static("public") );
    }

    routes(){
        this.app.use(this.authPath, require("../routes/auth"))
        this.app.use(this.usuariosPath, require("../routes/usuarios"))
        this.app.use(this.categoriaPath, require("../routes/categoria"))
        this.app.use(this.productosPath, require("../routes/productos"))
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log("Servidor corriendo en el puerto", process.env.PORT)
        });
    }
}

module.exports = Server;