const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const eventoSchema = new Schema(
    {
        titulo: String,
        descripcion: String,
        fecha: Date,
        hora: String,
        lugar: String,
        cupos: Number,
        privacidad: Boolean,
        nivel: String,
        imagen: String,
        deporte: { type: Schema.Types.ObjectId, ref: "deportes" },
        organizador: { type: Schema.Types.ObjectId, ref: "usuarios" },
        asistentes: [{ type: Schema.Types.ObjectId, ref: "usuarios" }],
    },
    { timestamps: true }
);

const Evento = mongoose.model("eventos", eventoSchema);

module.exports = Evento;