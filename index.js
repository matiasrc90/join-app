const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  

const app = express();
const port = process.env.PORT || 3000;

const { mongodbLink } = require("./configs");
mongoose.connect(mongodbLink);

const dbConnection = mongoose.connection;
dbConnection.once("open", () => {
  console.log("Conexion a DB exitosa");
});

const corsOptions = {
  origin: [
    /* 'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'http://127.0.0.1:3001', 
    'http://192.168.1.5:3000',  */
    'https://join-app.onrender.com',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
};



app.use(express.static('public'));

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ limit: "80mb", extended: false }));

app.get("/", (req, res) => {
  res.send("Servidor corriendo...");
});

// api endpoints
app.use("/api", require("./api"));

const server = app.listen(port, () => {
  console.info("Servidor corriendo " + port);
});







 

    
