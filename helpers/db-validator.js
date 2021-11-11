const { response } = require("express")
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

module.exports = {
    emailExiste,
    validarId
}