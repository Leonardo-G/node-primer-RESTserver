const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async ( req, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: "No hay archivos en la petición"});
    }

    const nombre = await subirArchivo( req.files );

    res.json({
        nombre
    })
    
}

module.exports = {
    cargarArchivo
}