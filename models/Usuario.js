
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const usuarioSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    nacionalidad: String,
    foto: String,
    nacimiento: Date,
    intereses: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: "deportes",
      }], default: []
    },
    eventosUsuario: { type: [String], default: [] },
  },
  { timestamps: true } 
);



const Usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = Usuario;
