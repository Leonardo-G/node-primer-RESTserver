const Categoria = require("../models/categoria");
const Usuario = require("../models/usuario");

const categoriasGet = async ( req, res ) => {

    const { limit, skip } = req.query;

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments({ estado: true}),
        Categoria.find({ estado: true})
        .populate("usuario", ["nombre", "correo"])
        .skip(Number(skip) || 0)
        .limit(Number(limit) || 5)
    ])

    res.json({
        total,
        categorias
    })
}

const categoriaGetId = ( req, res ) => {

}

const categoriaPost = async ( req, res ) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoría ${ nombre } ya existe`
        })
    }

    //Crear categoria
    const data = {
        nombre, 
        usuario: req.uid._id,
    }

    const categoria = new Categoria( data );
    await categoria.save();

    res.status(201).json(categoria)
}

const categoriaPut = ( req, res ) => {

}

const categoriaDelete = ( req, res ) => {

}

module.exports = {
    categoriasGet,
    categoriaGetId,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}