const express = require("express");
const router = express.Router();

const {
    findEventos,
    findEventoById,
    findEventosPorUsuario,
    crearEvento,
    editarEvento,
    deleteEvento,
    agregarUsuarioAEvento,
    borrarUsuarioDeEvento,  
} = require("../controllers/evento");

//OBTENER EVENTOS

router.get("/", async (req, res) => {
  try {
    const eventos = await findEventos(req.query);
    res.json({ eventos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


//OBTENER EVENTO POR ID

router.get("/:id", async (req, res) => {
  try {
    const evento = await findEventoById(req.params.id);
    res.json({ evento });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


//OBTENER EVENTOS DE USUARIO
router.get("/usuario/:usuarioId", async (req, res) => {
  let { usuarioId } = req.params;
  usuarioId = usuarioId.trim(); 

  try {
    const eventos = await findEventosPorUsuario(usuarioId);
    res.json({ eventos });
  } catch (error) {
    console.log("Error al obtener los eventos del usuario:", error);
    res.status(500).json({ error: "Error al obtener los eventos del usuario" });
  }
});




//CREAR EVENTO
router.post("/", async (req, res) => {
  try {
    const newevento = await crearEvento(req.body);
    res.json({ evento: newevento });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//EDITAR EVENTO
router.put("/:id", async (req, res) => {
  try {
    const eventoActualizado = await editarEvento(req.params.id, req.body);
    res.json({ evento: eventoActualizado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//ELIMINAR EVENTO
router.delete("/:id", async (req, res) => {
  try {
    const deletedInfo = await deleteEvento(req.params.id);
    res.json(deletedInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//AÑADIR USUARIO A EVENTO
router.put("/:eventoId/agregarUsuario/:usuarioId", async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const usuarioId = req.params.usuarioId;

    const evento = await agregarUsuarioAEvento(eventoId, usuarioId);
    if (!evento) {
      return res.status(404).json({ message: "Evento o usuario no encontrado" });
    }

    res.json({ message: "Usuario agregado al evento", evento });
  } catch (error) {
    console.error(error);
    if (error.message === "El evento ya está lleno") {
      return res.status(400).json({ error: "El evento ya está lleno" });
    }
    if (error.message === "El usuario ya está inscrito en el evento") {
      return res.status(400).json({ error: "El usuario ya está inscrito en el evento" });
    }
    res.status(500).json({ error: "Error al agregar usuario al evento" });
  }
});

//BORRAR USUARIO DE EVENTO
router.put("/:eventoId/borrarUsuario/:usuarioId", async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const usuarioId = req.params.usuarioId;

    const evento = await borrarUsuarioDeEvento(eventoId, usuarioId);
    if (!evento) {
      return res.status(404).json({ message: "Evento o usuario no encontrado" });
    }

    res.json({ message: "Usuario borrado del evento", evento });
  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: "Error al borrar usuario del evento" });
  }
});


module.exports = router;
