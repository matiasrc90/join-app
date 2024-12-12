const Evento = require("../models/Evento");
const Usuario = require("../models/Usuario");
const Deporte = require("../models/Deporte");

const populateFields = [
    {
        path: "deporte",
    },
    {
        path: "organizador",
    },
    {
        path: "asistentes",
    },
];

const crearEvento = async (params) => {
    const newEvento = new Evento({
        titulo: params.titulo,
        descripcion: params.descripcion,
        fecha: params.fecha,
        hora: params.hora,
        lugar: params.lugar,
        cupos: params.cupos,
        privacidad: params.privacidad,
        deporte: params.deporte,
        nivel: params.nivel,
        organizador: params.organizador,
        asistentes: params.asistentes || [],
        imagen: params.imagen,
    });

    await newEvento.save();
    return newEvento;
};

const findEventos = async (query) => {
    const tituloRegex = new RegExp(query.titulo || "", "i");

    const queryFilter = {
        titulo: { $regex: tituloRegex },

    };

    if (query.organizador) {
        queryFilter.organizador = query.organizador;
    }

    if (query.nivel) {
        queryFilter.nivel = query.nivel;
    }

    if (query.hora) {
        let comienzo, fin;

        switch (query.hora) {
            case "manana":
                comienzo = "00:00";
                fin = "11:59";
                break;
            case "tarde":
                comienzo = "12:00";
                fin = "19:59";
                break;
            case "noche":
                comienzo = "20:00";
                fin = "23:59";
                break;
            default:
                comienzo = "00:00";
                fin = "23:59";
        }

        queryFilter.hora = { $gte: comienzo, $lte: fin };
    }


    const eventos = await Evento.find(queryFilter)
        .populate({
            path: 'deporte',
            match: query.deporte ? { _id: query.deporte } : {},
        })

        .populate('organizador', 'nombre')
        .populate('asistentes', 'nombre');

    return query.deporte ? eventos.filter(evento => evento.deporte) : eventos;
};

const findEventoById = async (id) => {
    const evento = await Evento.findById(id).populate(populateFields).exec();
    return evento;
};

const agregarUsuarioAEvento = async (eventoId, usuarioId) => {
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            throw new Error("Evento no encontrado");
        }

        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        if (evento.asistentes.includes(usuarioId)) {
            throw new Error("El usuario ya está inscrito en el evento");
        }

        if (evento.asistentes.length >= evento.cupos) {
            throw new Error("El evento ya está lleno");
        }

        evento.asistentes.push(usuarioId);
        usuario.eventosUsuario.push(eventoId);

        await evento.save();
        await usuario.save();

        return evento;
    } catch (error) {
        console.error("Error al agregar usuario al evento:", error);
        throw error;
    }
};


const borrarUsuarioDeEvento = async (eventoId, usuarioId) => {
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            throw new Error("Evento no encontrado");
        }

        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        if (!evento.asistentes.includes(usuarioId)) {
            throw new Error("El usuario no está inscrito en el evento");
        }

        evento.asistentes.pull(usuarioId);
        await evento.save();

        return evento;
    } catch (error) {
        console.error("Error al borrar usuario del evento:", error);
        throw error;
    }
};

const findEventosPorUsuario = async (usuarioId) => {
    try {

        const eventos = await Evento.find({
            $or: [
                { organizador: usuarioId },
                { asistentes: usuarioId }
            ]
        })
            .populate('deporte', 'nombre')
            .populate('organizador', 'nombre')
            .populate('asistentes', 'nombre');

        return eventos;
    } catch (error) {
        console.error("Error al buscar eventos por usuario:", error);
        throw error;
    }
};

const editarEvento = async (id, params) => {
    try {
        const evento = await Evento.findById(id);
        if (!evento) {
            throw new Error("Evento no encontrado");
        }

        Object.keys(params).forEach((key) => {
            if (params[key] !== undefined) {
                evento[key] = params[key];
            }
        });

        const eventoActualizado = await evento.save();

        return await Evento.findById(eventoActualizado._id).populate(populateFields);
    } catch (error) {
        console.error("Error al editar evento:", error);
        throw error;
    }
};


const deleteEvento = async (id) => {
    try {
        const deletedInfo = await Evento.findByIdAndDelete(id);
        return deletedInfo;
    } catch (error) {
        console.error("Error al eliminar evento:", error);
        throw error;
    }
};

module.exports = {
    findEventos,
    findEventoById,
    findEventosPorUsuario,
    crearEvento,
    deleteEvento,
    editarEvento,
    agregarUsuarioAEvento,
    borrarUsuarioDeEvento,
    findEventosPorUsuario
};
