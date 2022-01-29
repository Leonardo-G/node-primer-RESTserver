const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config( process.env.CLOUDINARY_URL )

const Usuario = require("../models/usuario");
const Producto = require("../models/producto");

const cargarArchivo = async ( req, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: "No hay archivos en la petición"});
    }

    try {
        const nombre = await subirArchivo( req.files, undefined, "imgs" );
        
        res.json({
            nombre
        })
    } catch (msg) {
        res.status(400).json({ msg }); 
    }

    
}

//Funcion solamente de ejemplo, en caso de subir archivo en el entorno local.
const actualizarArchivo = async ( req, res ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case "usuarios":
            modelo = await Usuario.findById( id );
            
            if(!modelo){
                return res.status(400).json({
                    msg: "No existe un usuario con el id ${ id }"
                })
            }
            break;
        case "productos":
            modelo = await Producto.findById( id );
            
            if(!modelo){
                return res.status(400).json({
                    msg: "No existe un usuario el producto con el id ${ id }"
                })
            }
            break;
    
        default:
            return res.status(500).json({ msg: "error en la validación" })
    }

    //Limpiar imagenes previas
    if(modelo.img){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, "../uploads", coleccion, modelo.img);
        if( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen )
        }
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json({ modelo })
}

const obtenerImagen = async ( req, res ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case "usuarios":
            modelo = await Usuario.findById( id );
            
            if(!modelo){
                return res.status(400).json({
                    msg: "No existe un usuario con el id ${ id }"
                })
            }
            break;
        case "productos":
            modelo = await Producto.findById( id );
            
            if(!modelo){
                return res.status(400).json({
                    msg: "No existe un usuario el producto con el id ${ id }"
                })
            }
            break;
    
        default:
            return res.status(500).json({ msg: "error en la validación" })
    }

    //Limpiar imagenes previas
    if(modelo.img){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, "../uploads", coleccion, modelo.img);
        if( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen );
        }
    }

    //En caso de no mandar un imagen
    const pathImagen = path.join( __dirname, "../assets/no-image.jpg");
    res.sendFile( pathImagen );
        
}

const actualizarArchivoCloudinary = async ( req, res ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case "usuarios":
            modelo = await Usuario.findById( id );
            
            if(!modelo){
                return res.status(400).json({
                    msg: "No existe un usuario con el id ${ id }"
                })
            }
            break;
        case "productos":
            modelo = await Producto.findById( id );
            
            if(!modelo){
                return res.status(400).json({
                    msg: "No existe un usuario el producto con el id ${ id }"
                })
            }
            break;
    
        default:
            return res.status(500).json({ msg: "error en la validación" })
    }

        //Limpiar imagenes previas
        if(modelo.img){
            //Hay que borrar la imagen del servidor
            const nombreArr = modelo.img.split( "/" );
            const nombreImg = nombreArr[ nombreArr.length - 1 ];
            const [ idNombrePublic ] = nombreImg.split(".");
            
            await cloudinary.uploader.destroy( idNombrePublic );
        }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )

    modelo.img = secure_url;

    await modelo.save();

    res.json( modelo );
}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    obtenerImagen,
    actualizarArchivoCloudinary
}