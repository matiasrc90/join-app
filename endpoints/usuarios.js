const express = require("express");
const router = express.Router();

const {
  findUsuarios,
  findUsuarioById,
  registrarUsuario,
  loginUsuario,
  agregarInteres,
  deleteUsuario
} = require("../controllers/usuario");

// REGISTRO
router.post("/registro", async (req, res) => {
  try {
    const nuevousuario = await registrarUsuario(req.body);
    res.json({ nuevousuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ya hay una cuenta creada con ese correo" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const loginusuario = await loginUsuario(req.body);
    res.json({ loginusuario });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Usuario o contraseña incorrecta" });
  }
});


//OBTENER USUARIOS
router.get("/", async (req, res) => {
  try {
    const usuarios = await findUsuarios(req.query);
    res.json({ usuarios });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//OBTENER USUARIO POR ID
router.get("/:id", async (req, res) => {
  try {
    const usuario = await findUsuarioById(req.params.id);
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// EDITAR USUARIO

// AÑADIR INTERES
router.put("/agregar-interes", async (req, res) => {
  const { userId, deporteId } = req.body; // Asegúrate de enviar estos datos en el cuerpo de la solicitud
  try {
    const usuarioActualizado = await agregarInteres(userId, deporteId);
    res.json({ usuario: usuarioActualizado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//ELIMINAR USUARIO
router.delete("/:id", async (req, res) => {
  try {
    const deletedInfo = await deleteUsuario(req.params.id);
    res.json(deletedInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


module.exports = router;
