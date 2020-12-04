# P7groupomania
Fonctionnalité semblable à REDDIT : création de messages, possibilité de liker le message et de commenter.
Fonctionnalité semblable à 9GAG : postage de gifs, d'images.

# Démarrage base de donnée
Créer une base de donnée, soit nommée P7groupomania ou autre nom en paramétrant le fichier connectdb.

Copier les tables avec la ligne de commandes SQL : selectionner le fichier groupomania.sql par un dump.

mysql -v root -p password groupomania <dump.sql
ou dans PhpmyAdmin faire importer et choisir le fichier groupomania.sql

password = votre mot de passe

# Démarrage serveur
node server

