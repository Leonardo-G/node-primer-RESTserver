const express = require('express');
var cors = require('cors');

class Server {
    constructor(){
        this.usuariosPath = "/api/usuarios"; 


        this.app = express();

        //middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
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
        this.app.use(this.usuariosPath, require("../routes/usuarios"))
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log("Servidor corriendo en el puerto", process.env.PORT)
        });
    }
}

module.exports = Server;