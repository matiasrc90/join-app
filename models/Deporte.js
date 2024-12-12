const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deporteSchema = new Schema(
  {
    nombre: String,
    icon: String,
  }
);

const Deporte = mongoose.model("deportes", deporteSchema);

module.exports = Deporte;
