/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 5.1.49-community : Database - db_new
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_new` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_new`;

/*Table structure for table `t_new` */

DROP TABLE IF EXISTS `t_new`;

CREATE TABLE `t_new` (
  `newsId` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `author` varchar(20) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`newsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_new` */

/*Table structure for table `t_newtype` */

DROP TABLE IF EXISTS `t_newtype`;

CREATE TABLE `t_newtype` (
  `newType` int(10) NOT NULL AUTO_INCREMENT,
  `news` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`newType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_newtype` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
