const { response } = require("express")

const esAdminRole = ( req, res = response, next ) => {
    
    if(!req.uid){
        return res.status(500).json({
            msg: "Se requiere verificar el role"
        })
    }
    
    const { rol, nombre } = req.uid;

    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }
    
    next()
}

module.exports = {
    esAdminRole
}