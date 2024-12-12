const express = require("express");
const router = express.Router();

const usuariosRouter = require("./endpoints/usuarios");
router.use("/usuarios", usuariosRouter);


const deportesRouter = require("./endpoints/deportes");
router.use("/deportes", deportesRouter);

const eventosRouter = require("./endpoints/eventos");
router.use("/eventos", eventosRouter);

module.exports = router;
