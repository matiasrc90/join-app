const express = require("express");
const router = express.Router();

const {
    findDeportes,
    findDeporteById,
    createDeporte,
    updateDeporte,
    deleteDeporte,
  } = require("../controllers/deporte");



  // Find all deportes
// Filter by 'nombre' and 'icon'
router.get("/", async (req, res) => {
    try {
      const deportes = await findDeportes(req.query);
      res.json({ deportes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });
  
  // Find deporte by id
  router.get("/:id", async (req, res) => {
    try {
      const deporte = await findDeporteById(req.params.id);
      res.json({ deporte });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });
  
  // Create deporte
  router.post("/", async (req, res) => {
    try {
      const newdeporte = await createDeporte(req.body);
      res.json({ deporte: newdeporte });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });
  
  // Update deporte
  router.put("/:id", async (req, res) => {
    try {
      const updateddeporte = await updateDeporte(req.params.id, req.body);
      res.json({ deporte: updateddeporte });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });
  
  // Delete deporte
  router.delete("/:id", async (req, res) => {
    try {
      const deletedInfo = await deleteDeporte(req.params.id);
      res.json(deletedInfo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });
  



  module.exports = router;