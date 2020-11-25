-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 21 juin 2020 à 21:59


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` int(10) UNSIGNED NOT NULL,
  `postId` int(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `comContent` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_postId` (`postId`),
  KEY `fk_comments_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments` pour model
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `date`, `comContent`) VALUES
(1, 27, 28, '2020-11-25 14:59:08', 'auto commentaire');


-- --------------------------------------------------------

--
-- Structure de la table `likes`
--


CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `postId` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `fk_like_postId` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--


-- --------------------------------------------------------

--
-- Structure de la table `posts`
--
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `likes` int(10) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`pour model
--

INSERT INTO `posts` (`id`, `userId`, `title`, `content`, `date`, `likes`) VALUES
(2, 2, 'Mon premier post (Nelly)', 'Le soleil brille ', '2020-05-27 11:59:56', 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `moderation` int(11) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`pour model
--

INSERT INTO `users` (`id`, `lastName`, `firstName`, `email`, `password`, `moderation`) VALUES
(25, 'Violette', 'Delphine', 'delphine@test.fr', '$2b$10$.VGiPKdsz3TNk9i0jbsHJejZUmc9It/OEoPkfihVkyvPGd1BOGOzu', NULL);


--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comments_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_like_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_like_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_likes_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_likes_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
