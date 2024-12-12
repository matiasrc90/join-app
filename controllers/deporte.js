const Deporte = require("../models/Deporte");

// DEPORTES


const findDeportes = async (params) => {
  const nombreRegex = new RegExp(params.nombre, "i");
  const iconRegex = new RegExp(params.icon, "i");

  const query = {
    nombre: { $regex: nombreRegex },
    icon: { $regex: iconRegex },
  };

  const deportes = await Deporte.find(query).exec();
  return deportes;
};

// Find deporte by id
const findDeporteById = async (deporteId) => {
  const deporte = await Deporte.findById(deporteId)
  .exec();

  return deporte;
};

// Create deporte
const createDeporte = async (params) => {
  const newDeporte = new Deporte({
    nombre: params.nombre,
    icon: params.icon,
  });

  await newDeporte.save();
  return newDeporte;
};

// Update deporte
const updateDeporte = async (deporteId, params) => {
  const updatedDeporte = await Deporte.findByIdAndUpdate(
    deporteId,
    { deporte: params.deporte, icon: params.icon },
    { new: true }
  );

  return updatedDeporte;
};

// Delete deporte
const deleteDeporte = async (deporteId) => {
  const deletedInfo = await Deporte.deleteOne({ _id: deporteId });
  return deletedInfo;
};



module.exports = {
  findDeportes,
  findDeporteById,
  createDeporte,
  updateDeporte,
  deleteDeporte,
};
