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
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `Invoice_Id` int NOT NULL AUTO_INCREMENT,
  `Invoice_Number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Invoice_Date` date NOT NULL,
  `Departure_Date` date NOT NULL,
  `Agent_Name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Cruise_Ship` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Cruise` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Currency` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Booking` varchar(50) COLLATE latin1_bin NOT NULL,
  `Cabin` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Cat_Bkg` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Pass_Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Nationality` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Adults` int DEFAULT NULL,
  `Children` int DEFAULT NULL,
  `Infants` int DEFAULT NULL,
  `Adults_Rate` decimal(18,2) DEFAULT NULL,
  `Children_Rate` decimal(18,2) DEFAULT NULL,
  `Infants_Rate` decimal(18,2) DEFAULT NULL,
  `Comm_Rate` decimal(18,2) DEFAULT NULL,
  `Comm_Amt` decimal(18,2) DEFAULT NULL,
  `NCF` decimal(18,2) DEFAULT NULL,
  `NCF_Amt` decimal(18,2) DEFAULT NULL,
  `TAX` decimal(18,2) DEFAULT NULL,
  `TAX_Amt` decimal(18,2) DEFAULT NULL,
  `Grat` decimal(18,2) DEFAULT NULL,
  `Grat_Amt` decimal(18,2) DEFAULT NULL,
  `HS` decimal(18,2) DEFAULT NULL,
  `HS_Amt` decimal(18,2) DEFAULT NULL,
  `Misc` decimal(18,2) DEFAULT NULL,
  `TDS` decimal(18,2) DEFAULT NULL,
  `TDS_Amt` decimal(18,2) DEFAULT NULL,
  `Token_Amt` decimal(18,2) DEFAULT NULL,
  `CGST` decimal(18,2) DEFAULT NULL,
  `IGST` decimal(18,2) DEFAULT NULL,
  `SGST` decimal(18,2) DEFAULT NULL,
  `GST_Amt` decimal(18,2) DEFAULT NULL,
  `ROE` decimal(18,2) DEFAULT NULL,
  `Base_Amt` decimal(18,2) DEFAULT NULL,
  `Total_Payable_Amt` decimal(18,2) DEFAULT NULL,
  `Total_Payable_Amt_INR` decimal(18,2) DEFAULT NULL,
  `Token` tinyint(1) DEFAULT NULL,
  `GST` tinyint(1) DEFAULT NULL,
  `PAX` int DEFAULT NULL,
  PRIMARY KEY (`Invoice_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'CC20201-00124','2020-04-04','2020-04-27','2','Ship name','Cruise Company','5','Booking','cabin','cat','Passenger name','Indian',1,2,3,100.00,200.00,300.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1400.00,1400.00,1400.00,0,0,6),(2,'CC20204-00125','2020-04-06','2020-04-20','2','Ship NAME','Cruise Company','2','Booking','cabin','cat','Passenger name','nationality',1,2,3,100.57,200.58,300.87,18.50,259.80,33.35,200.10,44.35,266.10,NULL,NULL,55.35,218.10,1200.00,7.50,19.49,1200.00,9.00,10.00,9.50,963.42,66.78,1404.34,2417.00,161407.39,1,1,6),(3,'CC20204-00126','2020-04-06','2020-04-06','1','sdas','sdas','3','','','','sdasd','sdsa',1,0,0,100.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,100.00,100.00,100.00,0,0,1),(4,'CC20204-00127','2020-04-09','2020-04-09','2','sdasf','dsfsdf','3','dfdsf','dfdsf34','dff56','sfdsfsd fghfghgfh fghfghgfhg fhgfh','indian',11,1,1,1234.78,123.78,123.78,12.67,1752.28,456.89,5939.57,1234.78,16052.14,12.00,34.78,1223.89,8824.14,1200.00,5.80,101.63,1200.00,7.89,0.00,6.89,8883.66,67.97,13830.14,51222.25,3481576.33,1,1,13),(5,'CC20204-00128','2020-04-10','2020-04-28','3','Ship Name','Cruise Comany','5','booking','cabin','cat','Passenger Name','Inadian',4,2,3,100.00,200.00,300.00,12.50,212.50,11.00,99.00,22.00,198.00,33.00,297.00,44.00,396.00,100.00,7.50,15.94,0.00,7.50,0.00,8.50,414.95,65.75,1700.00,2593.44,143235.72,0,1,9);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
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
