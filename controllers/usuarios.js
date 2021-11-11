const { response, request } = require("express");
const Usuario = require("../models/usuario");
var bcrypt = require('bcryptjs');

const usuarioGet = async (req = request, res = response) => {

    const { limit, skip } = req.query;

    if(!limit){
        const usuarios = await Usuario.find({ estado: true});
        
        return res.json({
            usuarios
        })  
    }

    const [ total, usurios ] = await Promise.all([
        Usuario.countDocuments({ estado: true}),
        Usuario.find({ estado: true})
        .skip(Number(skip) || 0)
        .limit(Number(limit) || 5)
    ])

    res.json({
        total,
        usurios
    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo: correo })
    if(existeEmail){
        return res.status(400).json({
            msg: "Ese correo ya esta registrado"
        });
    }

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt);

    // //Guardar DB
    await usuario.save();
    
    res.status(201).json(usuario)
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos.
    if( password ){
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(201).json({
        msg: "put API",
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.status(201).json({
        msg: "patch API"
    })
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, {"estado": false}, {new: true})

    res.json(usuario)
}

module.exports = {
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}

