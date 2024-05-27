// Importando librerías
const express = require("express");
const expressFileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs").promises;
const exphbs = require("express-handlebars");
const bcrypt = require("bcrypt");

// Crea una instancia de Express
const app = express();

//Configurar el servidor para recibir payloads
app.use(express.json());

// Generando un nuevo token
const jwt = require("jsonwebtoken");

// Llave para firmar los tokens
const secretKey = "Mi Llave Ultra Secreta";

//Configurar el servidor para servir archivos estáticos
app.use(express.static(path.join(__dirname, "views")));

// Definir motor de plantillas
app.set("view engine", "handlebars");

// Configuración de handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: __dirname + "/views",
  })
);

// Importando datos desde consultas.js
const {
  consultarSkater,
  eliminarSkater,
  editarSkater,
  conectarDB,
  nuevoSkater,
  allSkaters,
} = require("./consultas");

// Llamamos a la función para ejecutar la consulta
nuevoSkater();
eliminarSkater();
editarSkater();
consultarSkater();
allSkaters();
conectarDB();

// Ruta raíz GET para servir main.handlebars
app.get("/", (req, res) => {
  res.render("main");
});

// Mostrar vista "Registrarse"
app.use("/registro", (req, res) => {
  res.render("Registro", { layout: "Registro" });
});

// Mostrar vista "Iniciar sesión"
app.use("/login", (req, res) => {
  res.render("Login", { layout: "Login" });
});

// Mostrar vista "Datos del usuario"
app.use("/datos", (req, res) => {
  res.render("Datos", { layout: "Datos" });
});

// Ruta protegida
app.get("/datos", verifyToken, (req, res) => {
  res.status(200).send("Ruta protegida");
});

// Mostrar vista "administrador"
app.use("/administrador", (req, res) => {
  res.render("Admin", { layout: "Admin" });
});

//Middleware para comprobar el tamaño del archivo
app.use(
  expressFileUpload({
    limits: { fileSize: 5000000 }, // 5 MB
    abortOnLimit: true,
    responseOnLimit:
    "El tamaño del archivo que intentas subir supera el limite",
  })
);

// Endpoint para registrar un usuario
app.post("/registro", async (req, res) => {
  // Insertar el usuario en la base de datos
  try {
    // Almacenando en un arreglo el objeto recibido en el cuerpo de la consulta
    const data = Object.values(req.body);

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Almacenar la foto del usuario
    const { target_file } = await foto.values(req.files);
    target_file.mv(`${__dirname}/assets/img/${target_file}.jpg`);

    // Devuelve la respuesta a la aplicación cliente
    const result = await nuevoSkater(data);
    res.status(201).json(result.rows[0]);

    // Si falla el registro, muestra un mensaje de error
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar el usuario");
  }
});

// Endpoint para autenticar un usuario
app.get("/login", async (req, res) => {
  // Buscar el usuario en la base de datos
  const { email, password } = Object.values(req.body);
  const result = await consultarSkater([email], [password]);
  const passwordMatch = await bcrypt.compare(password, skater.password);

  // Método find para encontrar algún usuario que coincida con las credenciales recibidas
  const skater = result.find(
    (skater) => skater.email == email && skater.password == passwordMatch
  );

  // Evalúa si el método find encontró un usuario con el email y password recibida
  if (skater) {
    // Si lo encuentra, genera un token que expire en 5 minutos
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 300,
        data: skater,
      },
      secretKey
    );
    // Muestra una vista donde se pueden actualizar los datos del usuario
    result.href("/views/Datos.handlebars");
  } else {
    // Devuelve un mensaje en caso de no encontrar un usuario con los datos ingresados
    return res
      .status(401)
      .send(`<p><h1>❌ Usuario o contraseña incorrecta ❌</h1></p>`);
  }
});

// Middleware para proteger rutas con JWT
const verifyToken = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Token no proporcionado");
  }

  jwt.verify(token, secretKey, (err, data) => {
    res.send(err ? `<p><h1>❌ Token inválido ❌</h1></p>` : data);
  });
};

// Endpoint para actualizar los datos de un usuario
app.put("/datos", async (req, res) => {
try {
    // Almacenando en un arreglo el objeto recibido en el cuerpo de la consulta
    const data = Object.values(req.body);
    // Devuelve la respuesta a la aplicación cliente
    const respuesta = await editarSkater(data);
    res.json(respuesta)

} catch (error) {
    console.error("Error al editar usuario", error);
    res.status(500).send("Internal server error");
  }
});

// Eliminar una cuenta
app.get("/delete", async (req, res) => {
  try {
    const { email } = req.query;
    const result = await eliminarSkater([email]);
    const skater = result.find((skater) => skater.email == email);
    res.send(`<p><h1>❌ Cuenta eliminada ❌</h1></p>`);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Integrando Bootstrap
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist/css")
);

// Integrando jQuery
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));

//Crear un servidor con Express en el puerto 3000
app.listen(3000, () => console.log("Your app listening on port 3000"));
