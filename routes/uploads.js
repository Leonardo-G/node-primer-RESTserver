const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarArchivo, obtenerImagen } = require("../controllers/uploads");
const { coleccionesPermitdas } = require("../helpers/db-validator");

const { validarCampos } = require("../middleware/validar-campos");

const router = Router();

router.post( "/", cargarArchivo );

router.put( "/:coleccion/:id", [
    check( "id", "El id debe válido de Mongo").isMongoId(),
    check( "coleccion" ).custom( c => coleccionesPermitdas( c, [ "usuarios", "productos" ])),
    validarCampos
], actualizarArchivo )

router.get( "/:coleccion/:id", [
    check( "id", "El id debe válido de Mongo").isMongoId(),
    check( "coleccion" ).custom( c => coleccionesPermitdas( c, [ "usuarios", "productos" ])),
    validarCampos
], obtenerImagen )

module.exports = router;