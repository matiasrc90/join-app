
const Usuario = require("../models/Usuario");
const Deporte = require("../models/Deporte");

const populateFields = [
  {
    path: "intereses",
  },
];

const registrarUsuario = async (params) => {

  const usuarioExistente = await Usuario.findOne({ email: params.email });
  if (usuarioExistente) {
    throw new Error("El email ya está en uso");
  }


  const newUsuario = new Usuario({
    email: params.email,
    password: params.password,
    nombre: params.nombre,
    apellido: params.apellido,
    nacionalidad: params.nacionalidad,
    foto: params.foto,
    nacimiento: params.nacimiento,
    intereses: params.intereses || [],
    eventosUsuario: params.eventosUsuario || [],
  });

  await newUsuario.save();
  return newUsuario;
};

const loginUsuario = async (params) => {
  const { email, password } = params;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw new Error("Usuario o contraseña incorrecta");
  }


  if (usuario.password !== password) {
    throw new Error("Usuario o contraseña incorrecta");
  }

  usuario.session = Math.random().toString(36).slice(2);
  await usuario.save();

  return {
    token: usuario.session,
    usuario: usuario,
  };
};


//OBTENER USUARIOS
const findUsuarios = async (params) => {
  const nombreRegex = new RegExp(params.nombre, "i");
  const apellidoRegex = new RegExp(params.apellido, "i");


  const query = {
    nombre: { $regex: nombreRegex },
    apellido: { $regex: apellidoRegex },
  };

  if (params.intereses) {
    query.intereses = { $in: [params.intereses] };
  }

  if (params.eventosUsuario) {
    query.eventosUsuario = { $in: [params.eventosUsuario] };
  }

  const usuarios = await Usuario.find(query).populate(populateFields).exec();
  return usuarios;
};

const findUsuarioById = async (id) => {
  const usuario = await Usuario.findById(id).populate(populateFields).exec();
  return usuario;
};


//EDITAR USUARIO
const agregarInteres = async (userId, deporteId) => {
  console.log("userId:", userId, "deporteId:", deporteId);
  const deporte = await Deporte.findById(deporteId);
  if (!deporte) {
    throw new Error("El deporte no existe");
  }

  const usuario = await Usuario.findById(userId);
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  if (!usuario.intereses.includes(deporteId)) {
    usuario.intereses.push(deporteId);
    await usuario.save();
  }

  return usuario;
};

//ELIMINAR USUARIO
const deleteUsuario = async (usuarioId) => {
  const deletedInfo = await Usuario.deleteOne({ _id: usuarioId });
  return deletedInfo;
};

module.exports = {
  findUsuarios,
  findUsuarioById,
  registrarUsuario,
  loginUsuario,
  agregarInteres,
  deleteUsuario,
};

