const { Router } = require("express");
const { check } = require("express-validator");
const { usuarioGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require("../controllers/usuarios");

const { validarCampos } = require("../middleware/validar-campos")
const { emailExiste, validarId } = require("../helpers/db-validator") 

const router = Router();

router.get( '/', usuarioGet ); 

router.put('/:id', [
    check("id", "El ID no válido").isMongoId(),
    check("id").custom(validarId),
    validarCampos,
], usuariosPut);

router.post('/', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({min: 6}),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom( correo => emailExiste(correo) ),
    check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos
] , usuariosPost);

router.delete('/:id', [
    check("id", "El ID no válido").isMongoId(),
    check("id").custom(validarId),
    validarCampos,
], usuariosDelete); 

router.patch('/', usuariosPatch);

module.exports = router;