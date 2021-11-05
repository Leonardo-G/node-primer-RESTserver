const { response, request } = require("express");

const usuarioGet = (req = request, res = response) => {

    const query = req.query

    res.json({
        msg: "get API - controlador",
        query
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: "post API",
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id

    res.status(201).json({
        msg: "put API",
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.status(201).json({
        msg: "patch API"
    })
}

const usuariosDelete = (req, res = response) => {
    res.status(201).json({
        msg: "delete API"
    })
}

module.exports = {
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}