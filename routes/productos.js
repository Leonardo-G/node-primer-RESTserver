const { Router } = require("express");
const { check } = require("express-validator");
const { productosGet, productosGetId, productosPost, productosPut, productosDelete } = require("../controllers/productos");
const { existeCategoria, existeProductoPorId } = require("../helpers/db-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole } = require("../middleware/validar-roles");

const router = Router();

// publico
router.get( '/', productosGet ); 

// publico
router.get( "/:id", [
    check( "id", "El id no es un id de Mongo válido" ).isMongoId(),
    check("id").custom( existeProductoPorId ),
    validarCampos
], productosGetId )

// Privado
router.post( "/", [ 
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom( existeCategoria ),
    validarCampos
], productosPost );

//Privado
router.put( "/:id", [
    validarJWT,
    check("id").custom( existeProductoPorId ),
    validarCampos
], productosPut );

// Borrar una categoria - Admin
router.delete( "/:id", [
    validarJWT,
    esAdminRole,
    check( "id", "El id no es un id de Mongo válido" ).isMongoId(),
    check("id").custom( existeProductoPorId ),
    validarCampos
], productosDelete );

module.exports = router;