const { response } = require("express")
const Categoria = require("../models/categoria")
const Producto = require("../models/producto")
const Usuario = require("../models/usuario")

const emailExiste = async ( correo = "" ) => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo: correo })
    if(existeEmail){
        throw new Error(`El correo: ${ correo }, ya esta registrado`)
    }
}

const validarId = async ( id ) => {
    
    const isExistId = await Usuario.findById(id)
    
    if( !isExistId ){
        throw new Error(`El id ${id} no existe`)
    }
}

const existeCategoria = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ){
        throw new Error(`El ${ id } no existe`)
    }
}

const existeProductoPorId = async ( id ) => {
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ){
        throw new Error(`El ${ id } no existe`)
    }
}

//Validar colecciones permitidas
const coleccionesPermitdas = ( coleccion = "", colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ) {
        throw new Error(`La coleccion ${ coleccion } no es permitida, se permiten ${ colecciones }`);
    }

    return true
}

module.exports = {
    emailExiste,
    validarId,
    existeCategoria,
    existeProductoPorId,
    coleccionesPermitdas
}