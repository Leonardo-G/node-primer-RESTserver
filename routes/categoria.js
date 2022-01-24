const { Router } = require("express");
const { check } = require("express-validator");
const { categoriasGet, categoriaGetId, categoriaPost, categoriaPut, categoriaDelete } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validator");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT } = require("../middleware/validar-jwt");

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
], categoriaPut );

// Borrar una categoria - Admin
router.delete( "/:id", categoriaDelete );

module.exports = router;