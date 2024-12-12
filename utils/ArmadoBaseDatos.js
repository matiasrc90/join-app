//USUARIOS

const usuarios = [
    {
        id: Number,
        usuario: String,
        password: String,
        nombre: String,
        apellido: String,
        nacionalidad: String, // String o Hay alguna forma de hacer una lista de paises? BUSCAR API DE PAISES
        nacimiento: Date, // Hacer función para mostrar edad
        foto: String,  //url
        intereses: [], //ids deportes
        eventosUsuario: [], //Array de ids de eventos
    },
]


/* DUDAS */

//COMO VINCULO LOS USUARIOS CON LOS EVENTOS?

//INTERESES relación con CATEGORIAS?

const deportes = [
    {
        id: Number,
        nombre: String,
        icono: String,
    }
]


//EVENTOS

const eventos = [
    {
        id: Number,
        creador: Number, //id del creador
        nombre: String,
        categoria: String, // String o Hay alguna forma de hacer una lista de categorias?
        fecha: Date,  //Manejar que se ingrese la fecha con formato dd/mm/aaaa
        ubicacion: { String, Number}, /* String directo de la dirección o coordenadas? */
        foto: String, //url
        cupos: Number,
        precio: Number,
        privacidad: Boolean, //false es privado, true es publico
        participantes: [],  //ids de usuarios
    }
]


const ejemploUsuario = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Perez",
        nacionalidad: "Uruguay",
        password: "123456",
        nacimiento: date,
        foto: "url",
        intereses: [deportes[0], deportes[1]],
        partidosJugados: [eventos[0], eventos[1]],
    },
]

const ejemploEvento = [
    {
        id: 1,
        creador: 1,
        nombre: "Copa de America 2021",
        categoria: "Futbol",
        fecha: date,
        ubicación: "Uruguay",
        fotos: "url",
        cupos: 20,
        precio: 1000,
        privacidad: false,
    },
]