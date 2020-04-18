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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `EntryDate` date DEFAULT NULL,
  `Credit_Account` int DEFAULT NULL,
  `Credit_Amount` decimal(18,2) DEFAULT NULL,
  `Debit_Account` int DEFAULT NULL,
  `Debit_Amount` decimal(18,2) DEFAULT NULL,
  `EntryType` varchar(100) DEFAULT NULL,
  `Invoice_Number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (4,'2020-04-09',1,NULL,2,NULL,'Invoice-Entry','CC20204-00127'),(5,'2020-04-10',1,197801.64,3,197801.64,'Invoice-Entry','CC20204-00128'),(6,'2020-04-25',1,5000.00,3,5000.00,'Invoice-Entry','CC20204-00129');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `create_accounts`
--

DROP TABLE IF EXISTS `create_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `create_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Date` date DEFAULT NULL,
  `Account_Name` varchar(200) DEFAULT NULL,
  `Remarks` varchar(200) DEFAULT NULL,
  `Opening_Balance` decimal(12,2) DEFAULT NULL,
  `Credit_Amount` decimal(12,2) DEFAULT NULL,
  `Debit_Amount` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `create_accounts`
--

LOCK TABLES `create_accounts` WRITE;
/*!40000 ALTER TABLE `create_accounts` DISABLE KEYS */;
INSERT INTO `create_accounts` VALUES (1,'2020-04-20','carrot cruise shipping pvt ltd','',0.00,NULL,NULL),(7,'2020-04-18','CASH IN HAND A/C','TESTING ACCOUNT',1000.00,1000.00,0.00),(8,'2020-04-18','EXPENSE A/C','',1000.00,0.00,1000.00);
/*!40000 ALTER TABLE `create_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `address_line_one` varchar(500) NOT NULL,
  `address_line_two` varchar(500) DEFAULT NULL,
  `city` varchar(500) NOT NULL,
  `state` varchar(500) DEFAULT NULL,
  `pincode` int DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `gstin` varchar(30) NOT NULL,
  `email` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'ram','kumar','address-1','address-2','city','1',110052,'88888','9999','dgf676','test@gmail.com'),(2,'asdasf','dsfsdf','dfdsf','adress-2','dfdsf','2',12132,'','','ewrwetrew','admin@test.com'),(3,'sdhfghjf33','ghdsgfhdgshf','dgfhgdshf dfghgdfhs ',NULL,'delhi','3',110052,'89898989','7878898','jsdhfjghjgf','test@gmail.com'),(4,'DFJSDGH','JSFGSGD','JDSGFGSD','HDGFHGSD','DHGHFGS','1',34234,'564367','3456325','JKDSFHJH2434','ndjfbsj@gmail.com'),(5,'RAM KUMAR SINGH','HHJDF HDF ','HDFJH HDHF JEUURY DFGHJF','','DELHI NEW ','2',120045,'','','HFGJFDGH454',''),(6,'TEST CUSTOMER','LASTNAME','STREET 145','','NEW DELHI','2',110078,'','','GHDFDH45','');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

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
  `Agent_Name` int NOT NULL,
  `Cruise_Ship` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Cruise` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Currency` int NOT NULL,
  `Booking` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'CC20201-00124','2020-04-04','2020-04-27',2,'Ship name','Cruise Company',5,'Booking','cabin','cat','Passenger name','Indian',1,2,3,100.00,200.00,300.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1400.00,1400.00,1400.00,0,0,6),(2,'CC20204-00125','2020-04-06','2020-04-20',2,'Ship NAME','Cruise Company',2,'Booking','cabin','cat','Passenger name','nationality',1,2,3,100.57,200.58,300.87,18.50,259.80,33.35,200.10,44.35,266.10,NULL,NULL,55.35,218.10,1200.00,7.50,19.49,1200.00,9.00,10.00,9.50,963.42,66.78,1404.34,2417.00,161407.39,1,1,6),(3,'CC20204-00126','2020-04-06','2020-04-06',1,'sdas','sdas',3,'','','','sdasd','sdsa',1,0,0,100.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,100.00,100.00,100.00,0,0,1),(4,'CC20204-00127','2020-04-09','2020-04-09',2,'sdasf','dsfsdf',3,'dfdsf','dfdsf34','dff56','sfdsfsd fghfghgfh fghfghgfhg fhgfh','indian',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),(5,'CC20204-00128','2020-04-10','2020-04-28',3,'Ship Name','Cruise Comany',2,'booking','cabin','cat','Passenger Name','Inadian',4,2,3,100.00,200.00,300.00,12.50,212.50,11.00,99.00,22.00,198.00,33.00,297.00,44.00,396.00,100.00,7.50,15.94,0.00,7.50,0.00,8.50,414.95,65.75,1700.00,3008.39,197801.64,0,0,9),(6,'CC20204-00129','2020-04-25','2020-04-12',3,'fghfgfd','ghcgcvb',5,'fg','fgfg','','gvcghcg','indian',5,0,0,1000.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,5000.00,5000.00,5000.00,0,0,5),(7,'CC20204-00130','2020-04-12','2020-04-12',3,'tret','rtr',4,'fgfg','cabin','cat','hjrghjhrj','indina',3,0,0,1000.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,3000.00,3000.00,3000.00,0,0,3),(8,'CC20204-00131','2020-04-12','2020-04-12',3,'dsgfdg','dsfdsfsdf',5,'sdgfrg','fgthf','dfh','dfgbfdhfghg','dfgfd',2,4,1,1289.00,7.00,23.00,12.40,326.00,100.00,700.00,32.00,224.00,23.00,161.00,34.00,238.00,0.00,6.70,21.84,1200.00,7.50,0.00,0.00,273.59,78.32,2629.00,3921.43,307126.40,0,0,7),(9,'CC20204-00132','2020-04-25','2020-04-13',3,'ghfghfhg','fgfgfghf',2,'','','','gdhfgdghfghd','gfghfghge',2,0,0,1000.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,7.50,0.00,0.00,7.80,0.00,5.80,272.00,81.56,2000.00,2272.00,185304.32,0,0,2),(10,'CC20204-00133','2020-04-17','2020-04-17',4,'FGHFhgf','ghghgf',5,'','','','fgfg','indian',10,0,0,1000.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,10000.00,10000.00,10000.00,0,0,10);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journal`
--

DROP TABLE IF EXISTS `journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `EntryDate` date DEFAULT NULL,
  `Credit_Account` int DEFAULT NULL,
  `Credit_Amount` decimal(18,2) DEFAULT NULL,
  `Debit_Account` int DEFAULT NULL,
  `Debit_Amount` decimal(18,2) DEFAULT NULL,
  `EntryType` varchar(100) DEFAULT NULL,
  `ChequeNumber` varchar(100) DEFAULT NULL,
  `BankName` varchar(100) DEFAULT NULL,
  `Comments` varchar(400) DEFAULT NULL,
  `Invoice_Number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journal`
--

LOCK TABLES `journal` WRITE;
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;
INSERT INTO `journal` VALUES (14,'2020-04-18',7,1000.00,8,1000.00,'CASH-TRANSACTION','','','',NULL);
/*!40000 ALTER TABLE `journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `EntryDate` date DEFAULT NULL,
  `Credit_Account` int DEFAULT NULL,
  `Credit_Amount` decimal(18,2) DEFAULT NULL,
  `Debit_Account` int DEFAULT NULL,
  `Debit_Amount` decimal(18,2) DEFAULT NULL,
  `EntryType` varchar(100) DEFAULT NULL,
  `ChequeNumber` varchar(100) DEFAULT NULL,
  `BankName` varchar(100) DEFAULT NULL,
  `Comments` varchar(400) DEFAULT NULL,
  `Invoice_Number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'2020-04-09',NULL,679.90,NULL,679.90,'1',NULL,NULL,'',NULL),(2,'2020-04-09',1,123.56,2,123.56,'CASH-PAYMENT',NULL,NULL,'dsfsdgdg ffgfdgdf fgdfg',NULL),(3,'2020-04-09',1,3434.00,1,3434.00,'BANK-PAYMENT','dfbdd124','Punjab national bank','dsfsdgdg ffgfdgdf fgdfg',NULL),(4,'2020-04-24',1,6000.00,3,6000.00,'CASH-PAYMENT',NULL,NULL,'',NULL),(5,'2020-04-12',1,7000.00,3,7000.00,'CASH-PAYMENT',NULL,NULL,'',NULL),(6,'2020-04-12',1,3000.00,3,3000.00,'Invoice-Entry',NULL,NULL,NULL,'CC20204-00130'),(7,'2020-04-12',1,5000.00,3,5000.00,'BANK-PAYMENT','','','',NULL),(8,'2020-04-12',1,700.00,3,700.00,'CASH-PAYMENT',NULL,NULL,'',NULL),(9,'2020-04-12',1,800.00,2,800.00,'CASH-PAYMENT',NULL,NULL,'',NULL),(10,'2020-04-12',1,307126.40,3,307126.40,'INVOICE',NULL,NULL,'Test Comments 1','CC20204-00131'),(12,'2020-04-25',1,185304.32,3,185304.32,'INVOICE',NULL,NULL,NULL,'CC20204-00132'),(13,'2020-04-17',1,10000.00,4,10000.00,'INVOICE',NULL,NULL,NULL,'CC20204-00133'),(14,'2020-04-18',1,864.44,2,864.44,'CASH-PAYMENT','','','',NULL),(15,'2020-04-18',1,500.00,2,500.00,'CASH-PAYMENT','','','CASJ PAYMENT OF 500',NULL),(16,'2020-04-18',1,1500.00,2,1500.00,'BANK-PAYMENT','GHGHTY5656GHGH','PUNJAB NATIONAL BANK','',NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receive`
--

DROP TABLE IF EXISTS `receive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `EntryDate` date DEFAULT NULL,
  `Credit_Account` int DEFAULT NULL,
  `Credit_Amount` decimal(18,2) DEFAULT NULL,
  `Debit_Account` int DEFAULT NULL,
  `Debit_Amount` decimal(18,2) DEFAULT NULL,
  `EntryType` varchar(100) DEFAULT NULL,
  `ChequeNumber` varchar(100) DEFAULT NULL,
  `BankName` varchar(100) DEFAULT NULL,
  `Comments` varchar(400) DEFAULT NULL,
  `Invoice_Number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receive`
--

LOCK TABLES `receive` WRITE;
/*!40000 ALTER TABLE `receive` DISABLE KEYS */;
INSERT INTO `receive` VALUES (1,'2020-04-09',2,6788.00,1,6788.00,'CASH-PAYMENT',NULL,NULL,'',NULL),(2,'2020-04-23',3,12000.00,1,12000.00,'CASH-RECEIVE',NULL,NULL,'',NULL),(3,'2020-04-12',3,8000.00,1,8000.00,'CASH-RECEIVE',NULL,NULL,'receive comments',NULL),(4,'2020-04-12',2,2000.00,1,2000.00,'CASH-RECEIVE',NULL,NULL,'',NULL),(6,'2020-04-25',3,100000.00,1,100000.00,'CASH-RECEIVE',NULL,NULL,'',NULL),(7,'2020-04-18',2,1000.00,1,1000.00,'CASH-RECEIVE','','','1000 PAID',NULL);
/*!40000 ALTER TABLE `receive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `State_Name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Andhra Pradesh'),(2,'Bihar'),(3,'Chandigarh'),(4,'Delhi');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping events for database 'shipping'
--

--
-- Dumping routines for database 'shipping'
--
/*!50003 DROP PROCEDURE IF EXISTS `GenerateInvoice` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GenerateInvoice`()
BEGIN
SET @x = (SELECT max(Invoice_Number) as InvoiceNo from invoices where Invoice_Number like CONCAT('CC',YEAR(CURDATE()),MONTH(CURDATE()),'%'));

IF(@x IS NULL) THEN 			
		SET @tempInv = (SELECT max(Invoice_Number) as InvoiceNo from invoices where Invoice_Number like CONCAT('CC',YEAR(CURDATE()),'%'));
        SET @sub = RIGHT(@tempInv,5) + 1 ;		
		SET @counter =RIGHT((concat('00000',convert(@sub, CHAR))),5);
		SET @Invoice_Number = CONCAT('CC',YEAR(CURDATE()),MONTH(CURDATE()),'-',@counter);       
        select @Invoice_Number;
ELSE
	   SET @tempInv = (SELECT max(Invoice_Number) as InvoiceNo from invoices where Invoice_Number like CONCAT('CC',YEAR(CURDATE()),MONTH(CURDATE()),'%'));
	   SET @sub = RIGHT(@tempInv,5) + 1 ;		
		SET @counter =RIGHT((concat('00000',convert(@sub, CHAR))),5);
		SET @Invoice_Number = CONCAT('CC',YEAR(CURDATE()),MONTH(CURDATE()),'-',@counter);       
        select @Invoice_Number;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-18 21:33:04
