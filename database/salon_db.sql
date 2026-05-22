-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: salon_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_registro` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Admin','admin','0600000000','admin@gmail.com','123456','2026-05-04 00:00:00'),(2,'Admin','admin','0600000000','admin@gmail.com','123456','2026-05-04 00:00:00');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cita_servicio`
--

DROP TABLE IF EXISTS `cita_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cita_servicio` (
  `citas_id` int(11) NOT NULL,
  `servicios_id` int(11) NOT NULL,
  PRIMARY KEY (`citas_id`,`servicios_id`),
  KEY `IDX_7A274B50F103737D` (`citas_id`),
  KEY `IDX_7A274B50D96E005D` (`servicios_id`),
  CONSTRAINT `FK_7A274B50D96E005D` FOREIGN KEY (`servicios_id`) REFERENCES `servicios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_7A274B50F103737D` FOREIGN KEY (`citas_id`) REFERENCES `citas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita_servicio`
--

LOCK TABLES `cita_servicio` WRITE;
/*!40000 ALTER TABLE `cita_servicio` DISABLE KEYS */;
INSERT INTO `cita_servicio` VALUES (9,1),(48,1),(49,11),(50,2),(51,13),(52,1),(53,1);
/*!40000 ALTER TABLE `cita_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_cita` datetime NOT NULL,
  `hora_cita` time NOT NULL,
  `estado` varchar(50) NOT NULL,
  `comentario` longtext DEFAULT NULL,
  `fecha_solicitud` datetime NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B88CF8E5DE734E51` (`cliente_id`),
  KEY `IDX_B88CF8E5642B8210` (`admin_id`),
  CONSTRAINT `FK_B88CF8E5642B8210` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`),
  CONSTRAINT `FK_B88CF8E5DE734E51` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (9,'2026-05-05 00:00:00','22:19:00','confirmada',NULL,'2026-05-04 15:14:54',19,1),(48,'2026-05-17 00:00:00','21:00:00','confirmada',NULL,'2026-05-17 14:17:21',65,1),(49,'2026-05-21 00:00:00','09:00:00','confirmada',NULL,'2026-05-20 19:48:21',66,1),(50,'2026-05-21 00:00:00','09:00:00','confirmada',NULL,'2026-05-20 19:53:14',67,1),(51,'2026-05-21 00:00:00','10:00:00','pendiente',NULL,'2026-05-20 21:50:55',68,1),(52,'2026-05-22 00:00:00','13:00:00','confirmada',NULL,'2026-05-22 09:06:20',69,1),(53,'2026-05-22 00:00:00','09:00:00','pendiente',NULL,'2026-05-22 09:20:35',70,1);
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `genero` varchar(10) NOT NULL,
  `detalles` longtext NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizacion` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (19,'Juan','amin2@gmail.com','000000000','Hombre','sin','2026-04-22 08:43:43','2026-04-22 08:43:59'),(65,'Carlos','carlos1@gmail.com','000000000','Hombre','Cliente Web','2026-05-17 14:17:20','2026-05-17 14:17:20'),(66,'Isma','isma@gmail.com','000000000','Hombre','Cliente Web','2026-05-20 19:48:18','2026-05-20 19:48:18'),(67,'Anas','ana@gmail.com','000000000','Hombre','Cliente Web','2026-05-20 19:53:13','2026-05-20 19:53:13'),(68,'Adrian','ad@gmail.com','000000000','Hombre','Cliente Web','2026-05-20 21:50:50','2026-05-20 21:50:50'),(69,'Javier','javier@gmail.com','000000000','Hombre','Cliente Web','2026-05-22 09:06:14','2026-05-22 09:06:14'),(70,'Amin','amin@gmail.com','000000000','Hombre','Cliente Web','2026-05-22 09:20:33','2026-05-22 09:20:33');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_factura`
--

DROP TABLE IF EXISTS `detalle_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_factura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `precio` double NOT NULL,
  `factura_id` int(11) NOT NULL,
  `servicio_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B1354EA1F04F795F` (`factura_id`),
  KEY `IDX_B1354EA171CAA3E7` (`servicio_id`),
  CONSTRAINT `FK_B1354EA171CAA3E7` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`),
  CONSTRAINT `FK_B1354EA1F04F795F` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_factura`
--

LOCK TABLES `detalle_factura` WRITE;
/*!40000 ALTER TABLE `detalle_factura` DISABLE KEYS */;
INSERT INTO `detalle_factura` VALUES (24,1,10,31,1),(26,1,22,33,11),(27,1,5,34,2),(28,1,10,35,1),(29,1,10,36,1);
/*!40000 ALTER TABLE `detalle_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20260412210537','2026-04-12 21:07:05',509);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_factura` varchar(255) NOT NULL,
  `fecha_factura` datetime NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_622B9C0FDE734E51` (`cliente_id`),
  KEY `IDX_622B9C0F642B8210` (`admin_id`),
  CONSTRAINT `FK_622B9C0F642B8210` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`),
  CONSTRAINT `FK_622B9C0FDE734E51` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (31,'FAC-1779027475434','2026-05-17 14:17:55',65,1),(33,'FAC-1779306546954','2026-05-20 19:49:06',66,1),(34,'FAC-1779313901703','2026-05-20 21:51:41',67,1),(35,'FAC-1779440829350','2026-05-22 09:07:09',69,1),(36,'FAC-1779440830789','2026-05-22 09:07:10',69,1);
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_servicio` varchar(255) NOT NULL,
  `descripcion` longtext NOT NULL,
  `costo` double NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_C07E802F642B8210` (`admin_id`),
  CONSTRAINT `FK_C07E802F642B8210` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Corte de pelo','Corte clásico o moderno adaptado al estilo del cliente. Incluye acabado profesional.',10,'2026-05-20 19:31:59',1),(2,'Arreglo de barba','Perfilado, recorte y definición de barba con máquina o tijera.',5,'2026-05-20 21:43:44',1),(3,'Afeitado clásico','Afeitado completo con navaja y toalla caliente para un acabado suave y tradicional.',12,'2026-05-20 19:33:57',1),(4,'Tinte de cabello','Aplicación de color para cubrir canas o cambiar el estilo del cabello.',20,'2026-05-20 19:40:18',1),(11,'Corte + lavado','Corte de cabello con lavado antes o después del servicio para mejor acabado y limpieza.',22,'2026-05-20 19:30:23',1),(13,'Peinado','Aplicación de productos y peinado final para dar estilo al cabello.',5,'2026-05-20 19:43:08',1),(15,'Servicio a domicilio','Atención personalizada en casa del cliente con coste adicional por desplazamiento.',30,'2026-05-20 19:47:16',1),(16,'Servicio Premium','Experiencia VIP con corte, barba, lavado, masaje y productos premium.',30,'2026-05-20 19:50:41',1);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'salon_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-22 19:33:35
