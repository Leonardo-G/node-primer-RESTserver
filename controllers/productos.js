const Producto = require("../models/producto");

const productosGet = async ( req, res ) => {

    const { limit, skip } = req.query;

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments({ estado: true}),
        Producto.find({ estado: true})
        .populate("usuario", ["nombre", "correo"])
        .populate("categoria", "nombre")
        .skip(Number(skip) || 0)
        .limit(Number(limit) || 5)
    ])

    res.json({
        total,
        productos
    })
}

const productosGetId = async ( req, res ) => {
    const { id } = req.params;
    const producto = await Producto.findById( id ).populate("usuario", [ "nombre", "correo" ])

    res.json( producto );
}

const productosPost = async ( req, res ) => {
    const { estado, usuario, nombre, ...dataCampos } = req.body;
   
    try {
        const productoDB = await Producto.findOne({ nombre: nombre });
    
        if(productoDB){
            return res.status(400).json({
                msg: `El producto ${ nombre } ya existe`
            })
        }
    
        //Crear categoria
        const data = {
            ...dataCampos,
            nombre: nombre.toUpperCase(), 
            usuario: req.uid._id,
        }
    
        const producto = new Producto( data );
        await producto.save();
    
        res.status(201).json(producto)
        
    } catch (error) {
        console.log("Aca esta dando error")
        console.log(error)
    }
}

const productosPut = async ( req, res ) => {
    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true })

    res.status(200).json(producto)
}

const productosDelete = async ( req, res ) => {

    try {
        const { id } = req.params;
        const productoBorrada = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true });
    
        res.status(200).json( productoBorrada )
        
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    productosGet,
    productosGetId,
    productosPost,
    productosPut,
    productosDelete
}