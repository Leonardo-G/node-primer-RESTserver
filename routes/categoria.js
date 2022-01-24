const { Router } = require("express");
const { check } = require("express-validator");
const { categoriasGet, categoriaGetId, categoriaPost, categoriaPut, categoriaDelete } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole } = require("../middleware/validar-roles");

const router = Router();

// publico
router.get( '/', categoriasGet ); 

// publico
router.get( "/:id", [
    check( "id", "El id no es un id de Mongo válido" ).isMongoId(),
    check("id").custom( existeCategoria ),
    validarCampos
], categoriaGetId )

// Privado
router.post( "/:id", [ 
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], categoriaPost );

//Privado
router.put( "/:id", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom( existeCategoria ),
    validarCampos
], categoriaPut );

// Borrar una categoria - Admin
router.delete( "/:id", [
    validarJWT,
    esAdminRole,
    check( "id", "El id no es un id de Mongo válido" ).isMongoId(),
    check("id").custom( existeCategoria ),
    validarCampos
], categoriaDelete );

module.exports = router;