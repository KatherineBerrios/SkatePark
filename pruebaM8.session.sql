-- Crear la base de datos
CREATE DATABASE skatepark;

-- Conectarse a la base de datos
\c skatepark;

-- Crear la tabla skaters
CREATE TABLE skaters (
  id SERIAL,
  email VARCHAR(50) NOT NULL,
  nombre VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  anios_experiencia INT NOT NULL,
  especialidad VARCHAR(50) NOT NULL,
  foto VARCHAR(255) NOT NULL,
  estado BOOLEAN NOT NULL
);

-- Ingresar datos en la tabla
INSERT INTO skaters(email, nombre, password,anios_experiencia,especialidad,foto,estado) VALUES
( 'tonyhawk@skate.com', 'Tony Hawk', '12345678', 12, 'Kickflip', 'C:\Users\berka\Downloads\img\tony.jpg', true),
( 'evelien@skate.com', 'Evelien Bouilliart', '87654321', 10,'Heelflip', 'C:\Users\berka\Downloads\img\Evelien.jpg', true),
( 'dannyway@skate.com', 'Danny Way', '12873465',8,'Ollie', 'C:\Users\berka\Downloads\img\Danny.jpg', false);