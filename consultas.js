// Importando datos desde la base de datos
const pool = require("./configBD");


// Función asíncrona para probar la conexión a la base de datos
const conectarDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa, fecha y hora actuales:", res.rows[0]);

  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
  await pool.end();
};

// Insertando datos en la tabla skaters
const nuevoSkater = async () => {
  const queryConfig = {
    text: "INSERT INTO skaters (email, nombre, password, anios_experiencia, especialidad, foto) VALUES ($1, $2, $3, $4, $5, $6)",
    values: [
      (email = email.value),
      (nombre = nombre.value),
      (password = password.value),
      (anios_experiencia = anios_experiencia.value),
      (especialidad = especialidad.value),
      (foto = file.value),
    ],
  };

try {
  const result = await pool.query(queryConfig);
  console.log("Usuario agregado con éxito");
  return result;

} catch (error) {
  console.error("Error al crear usuario", error);
}
  await pool.end();
};

// Actualizando datos en la tabla skaters
const editarSkater = async (data) => {
  const queryConfig = {
    text: "UPDATE skaters SET nombre = $1, password = $2, anios_experiencia =$3, especialidad =$4 WHERE nombre = $1 RETURNING *",
    values: data,
  };

try {
  const result = await pool.query(queryConfig);
  console.log(`Usuario ${nombre} editado con éxito`);
  return result;

} catch (error) {
  console.error("Error al actualizar los datos", error);
}
await pool.end();
};

// Consultando los datos de un usuario de la tabla skaters
const consultarSkater = async () => {
  const queryConfig = {
    // Mostrar los datos en forma de arreglos con rowMode
    rowMode: "array",
    text: "SELECT * FROM skaters WHERE email = $1",
  };

  try {
    const result = await pool.query(queryConfig, [email]);
    return result;

  } catch (error) {
    console.error("Error en la consulta de los datos.", error);
    }
await pool.end();
};

// Consultando todos los datos de la tabla skaters
const allSkaters = async () => {
  const queryConfig = {
    // Mostrar los datos en forma de arreglos con rowMode
    rowMode: "array",
    text: "SELECT * FROM skaters",
  };

  try {
    const result = await pool.query(queryConfig);
    return result;

  } catch (error) {
    console.error("Error en la consulta de los datos.", error);
    }
await pool.end();
};

// Borrando datos en la tabla skaters
const eliminarSkater = async (email) => {
  const queryConfig = {
    text: `DELETE FROM skaters WHERE email = ${email}`,
    values: [email],
  };

  try {
    const result = await pool.query(queryConfig, [email]);
    console.log(`Usuario con email ${email} eliminado con éxito`);
    return result;

  } catch (error) {
      console.error("Error en la eliminación de los datos.", error);
    }
await pool.end();
};

// Exporta los datos de cada función
module.exports = {
  conectarDB,
  consultarSkater,
  eliminarSkater,
  nuevoSkater,
  editarSkater,
  allSkaters,
};