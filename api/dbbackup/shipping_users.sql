-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: shipping
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` int DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','test','admin@test.com','$2b$10$e4HUB3WLgWlTSdf9bWF/guz0dHPXSRkLAJWc3OHLVRAZACxbbEOXi',1234567891,'male'),(4,'first_name','last_name','qwerty@test.com','$2b$10$mYdTVqScpB.2H.ZvP8nbtuKr0wYx/Bpbfo8CZwn7pvAa4UJ3vkmZW',8989999,'male'),(5,'first_name','last_name','qwerty@test.com','$2b$10$r7QHgLt6svGLdwSGEkvb7u/YmeM/C/x8kRVKW6ucqfCivJGbif4Am',8989999,'male'),(6,'first_name','last_name','qwerty@test.com','$2b$10$gzTxqirqdObqd8PhOLPYC.YKrWkPEP2NGgru3o5q4Q6ov.YXqbCCW',8989999,'male'),(7,'first_name','last_name','qwerty@test.com','$2b$10$e7p3CumFwlauGMpqUuW8J.HPiPEwHXTYuw9SFadgVOwli2o0.Gb96',8989999,'male'),(8,'first_name','last_name','qwerty@test.com','$2b$10$6E6oXShne4HK/n/LyMeiGOI4nhoXrXgm6mrQl6gwVzq53zTqA06bC',8989999,'male'),(9,'first_name','last_name','qwerty@test.com','$2b$10$/KtJAF5eXH3nxRtDYYBTeeaC8IKvHuczhLshLlj5AKuv2xoqXf0AC',8989999,'male'),(10,'first_name','last_name','qwerty@test.com','$2b$10$SbaWEZCqVdxAMYHTQgU9gu7ejFtxXPHPBiDD23MjHxeBqvzNMEEPW',8989999,'male'),(11,'first_name','last_name','qwerty@test.com','$2b$10$RcP5KkrPLVt7VuWW57h0h.dtU.pkVY3UXUOUAfskzewkiMu8KxXGq',8989999,'male'),(12,'first_name','last_name','qwerty@test.com','$2b$10$1FGZuPplJEWNnUnOc/Pcy.gtSc6O3Bdh3hrCPAkvI1N0BIPfa8Gm.',8989999,'male'),(13,'first_name','last_name','qwerty@test.com','$2b$10$YtXoKHnSZnQM7rwwgkVideHVZQypLlQ8pY8RuxoKs2oE0HjGOilcu',8989999,'male'),(14,'first_name','last_name','qwerty@test.com','$2b$10$7BG0ghSJltQJCp/njGYET.CrReCuiIP2p6/BSBiAks1rqYXrZfMNm',8989999,'male');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-11 14:04:51
