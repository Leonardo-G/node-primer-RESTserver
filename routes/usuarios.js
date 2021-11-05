const { Router } = require("express");
const { usuarioGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require("../controllers/usuarios");

const router = Router();

router.get( '/', usuarioGet ); 

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete); 

router.patch('/', usuariosPatch); 

module.exports = router;