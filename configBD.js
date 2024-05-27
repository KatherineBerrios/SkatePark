// Importando la librería de PostgreSQL
const { Pool } = require("pg");

// Conexión a la base de datos a través del objeto config
const config = {
  user: "user", // Escribe tu usuario
  host: "localhost",
  database: "skatepark",
  password: "password", // Escribe tu contraseña
  port: 5432,
};

const pool = new Pool(config);

module.exports = pool;
