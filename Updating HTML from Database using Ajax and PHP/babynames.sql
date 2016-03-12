-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2016 at 03:57 AM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `babynames`
--

CREATE TABLE `babynames` (
  `name` varchar(30) NOT NULL,
  `year` year(4) NOT NULL,
  `ranking` int(2) NOT NULL,
  `gender` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `babynames`
--

INSERT INTO `babynames` (`name`, `year`, `ranking`, `gender`) VALUES
('Abigail', 2005, 4, 'f'),
('Alexander', 2009, 4, 'm'),
('Ava', 2006, 5, 'f'),
('Ava', 2007, 4, 'f'),
('Ava', 2008, 5, 'f'),
('Ava', 2009, 5, 'f'),
('Ava', 2010, 5, 'f'),
('Ava', 2011, 5, 'f'),
('Ava', 2012, 5, 'f'),
('Ava', 2013, 5, 'f'),
('Daniel', 2007, 5, 'm'),
('Daniel', 2008, 5, 'm'),
('Emily', 2004, 1, 'f'),
('Emily', 2005, 1, 'f'),
('Emily', 2006, 1, 'f'),
('Emily', 2007, 1, 'f'),
('Emily', 2008, 3, 'f'),
('Emma', 2004, 2, 'f'),
('Emma', 2005, 2, 'f'),
('Emma', 2006, 2, 'f'),
('Emma', 2007, 3, 'f'),
('Emma', 2008, 1, 'f'),
('Emma', 2009, 2, 'f'),
('Emma', 2010, 3, 'f'),
('Emma', 2011, 3, 'f'),
('Emma', 2012, 2, 'f'),
('Emma', 2013, 2, 'f'),
('Ethan', 2004, 5, 'm'),
('Ethan', 2005, 5, 'm'),
('Ethan', 2006, 4, 'm'),
('Ethan', 2007, 3, 'm'),
('Ethan', 2008, 3, 'm'),
('Ethan', 2009, 2, 'm'),
('Ethan', 2010, 2, 'm'),
('Ethan', 2012, 3, 'm'),
('Hannah', 2004, 5, 'f'),
('Isabella', 2006, 4, 'f'),
('Isabella', 2007, 2, 'f'),
('Isabella', 2008, 2, 'f'),
('Isabella', 2009, 1, 'f'),
('Isabella', 2010, 1, 'f'),
('Isabella', 2011, 2, 'f'),
('Isabella', 2012, 3, 'f'),
('Isabella', 2013, 4, 'f'),
('Jacob', 2004, 1, 'm'),
('Jacob', 2005, 1, 'm'),
('Jacob', 2006, 1, 'm'),
('Jacob', 2007, 1, 'm'),
('Jacob', 2008, 1, 'm'),
('Jacob', 2009, 1, 'm'),
('Jacob', 2010, 1, 'm'),
('Jacob', 2011, 1, 'm'),
('Jacob', 2012, 1, 'm'),
('Jacob', 2013, 3, 'm'),
('Jayden', 2010, 4, 'm'),
('Jayden', 2011, 4, 'm'),
('Joshua', 2004, 3, 'm'),
('Joshua', 2005, 3, 'm'),
('Joshua', 2006, 3, 'm'),
('Joshua', 2007, 4, 'm'),
('Joshua', 2008, 4, 'm'),
('Liam', 2013, 2, 'm'),
('Madison', 2004, 3, 'f'),
('Madison', 2005, 3, 'f'),
('Madison', 2006, 3, 'f'),
('Madison', 2007, 5, 'f'),
('Mason', 2011, 2, 'm'),
('Mason', 2012, 2, 'm'),
('Mason', 2013, 4, 'm'),
('Matthew', 2004, 4, 'm'),
('Matthew', 2005, 4, 'm'),
('Matthew', 2006, 5, 'm'),
('Michael', 2004, 2, 'm'),
('Michael', 2005, 2, 'm'),
('Michael', 2006, 2, 'm'),
('Michael', 2007, 2, 'm'),
('Michael', 2008, 2, 'm'),
('Michael', 2009, 3, 'm'),
('Michael', 2010, 3, 'm'),
('Noah', 2011, 5, 'm'),
('Noah', 2012, 4, 'm'),
('Noah', 2013, 1, 'm'),
('Olivia', 2004, 4, 'f'),
('Olivia', 2005, 5, 'f'),
('Olivia', 2008, 4, 'f'),
('Olivia', 2009, 3, 'f'),
('Olivia', 2010, 4, 'f'),
('Olivia', 2011, 4, 'f'),
('Olivia', 2012, 4, 'f'),
('Olivia', 2013, 3, 'f'),
('Sophia', 2009, 4, 'f'),
('Sophia', 2010, 2, 'f'),
('Sophia', 2011, 1, 'f'),
('Sophia', 2012, 1, 'f'),
('Sophia', 2013, 1, 'f'),
('William', 2009, 5, 'm'),
('William', 2010, 5, 'm'),
('William', 2011, 3, 'm'),
('William', 2012, 5, 'm'),
('William', 2013, 5, 'm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `babynames`
--
ALTER TABLE `babynames`
  ADD PRIMARY KEY (`name`,`year`,`ranking`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
