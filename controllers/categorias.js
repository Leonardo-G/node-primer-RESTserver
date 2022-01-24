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

const categoriaGetId = async ( req, res ) => {
    const { id } = req.params;
    const categoria = await Categoria.findById( id ).populate("usuario", [ "nombre", "correo" ])

    res.json( categoria );
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

const categoriaPut = async ( req, res ) => {
    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;
    
    data.nombre = data.nombre.toUpperCase();

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true })

    res.status(200).json(categoria)
}

const categoriaDelete = async ( req, res ) => {

    try {
        const { id } = req.params;
        const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true });
    
        res.status(200).json( categoriaBorrada )
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    categoriasGet,
    categoriaGetId,
    categoriaPost,
    categoriaPut,
    categoriaDelete
}