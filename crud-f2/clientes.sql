-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2022 a las 21:18:27
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empresa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `ID_CLIENTE` int(11) NOT NULL,
  `nombreCliente` varchar(100) NOT NULL,
  `apellidoCliente` varchar(100) NOT NULL,
  `fNacimientoCliente` date NOT NULL,
  `pesoCliente` float NOT NULL,
  `alturaCliente` float NOT NULL,
  `domicilioCliente` varchar(100) NOT NULL,
  `codPostal` int(11) NOT NULL,
  `tel01` int(11) NOT NULL,
  `tel02` int(11) NOT NULL,
  `emailCliente` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`ID_CLIENTE`, `nombreCliente`, `apellidoCliente`, `fNacimientoCliente`, `pesoCliente`, `alturaCliente`, `domicilioCliente`, `codPostal`, `tel01`, `tel02`, `emailCliente`) VALUES
(1, 'Lucas', 'Forchino', '1979-01-24', 95.5, 1.6, 'Jujuy 1234', 7600, 2147483647, 0, 'lucas@gmail.com'),
(2, 'Jorge ', 'Solis', '1945-10-01', 78.2, 1.8, 'Almafuerte 321', 8000, 2147483647, 2147483647, 'j@hotmail.com'),
(3, 'Javier', 'Fernandez', '1975-09-02', 90, 1.77, 'Av. Paso 100', 7600, 2147483647, 2147483647, 'javier@gmail.com'),
(4, 'Jorge ', 'Solisa', '1982-01-01', 100, 1.8, 'Av. Colon 4444', 7600, 2147483647, 2147483647, 'sol@gmail.com'),
(5, 'Juan', 'Mercado', '1964-02-02', 89.6, 1.77, 'Av. Independencia 720', 7600, 2147483647, 2147483647, 'mercado@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`ID_CLIENTE`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `ID_CLIENTE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
