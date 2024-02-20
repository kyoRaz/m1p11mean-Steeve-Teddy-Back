var express = require('express');
var router = express.Router();
const ctrl = require('../controller/user.controller');


let route = '/users';


/**
 * @swagger
 * /api/beauty/users:
 *   get:
 *     summary: Liste tous les utilisateurs avec pagination et filtrage
 *     description: Récupère une liste paginée de tous les utilisateurs enregistrés, avec la possibilité d'appliquer des filtres.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de la page pour la pagination (commence à 0)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Nombre d'utilisateurs par page
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Terme de filtrage appliqué aux utilisateurs
 *     responses:
 *       200:
 *         description: Liste paginée des utilisateurs récupérée avec succès
 */
router.get(`${route}`, ctrl.findAll);

/**
 * @swagger
 * /api/beauty/users/client:
 *   post:
 *     summary: Crée un nouveau client
 *     description: Ajoute un nouvel utilisateur avec les informations fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: nom de l'utilisateur
 *               prenom:
 *                 type: string
 *                 description: prenom de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur créé avec succès
 */
router.post(`${route}/client`, ctrl.signUp);

/**
 * @swagger
 * /api/beauty/users/employe:
 *   post:
 *     summary: Crée un nouvel employé
 *     description: Ajoute un nouvel employé avec les informations fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'employé
 *               prenom:
 *                 type: string
 *                 description: Prénom de l'employé
 *     responses:
 *       200:
 *         description: Employé créé avec succès
 */
router.post(`${route}/employe`, ctrl.createEmploye);

/**
 * @swagger
 * /api/beauty/users/activation:
 *   post:
 *     summary: Active un utilisateur
 *     description: Active le compte d'un utilisateur en utilisant un code d'activation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Code d'activation pour l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur activé avec succès
 */
router.post(`${route}/activation`, ctrl.activationUser);

/**
 * @swagger
 * /api/beauty/users/{id}:
 *   put:
 *     summary: update User
 *     description: updates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l user à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 */
router.put(`${route}/:id`, ctrl.update);

/**
 * @swagger
 * /api/beauty/users/pwsd:
 *   post:
 *     summary: Réinitialise et active le mot de passe
 *     description: Réinitialise et active le mot de passe de l'utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: id de l'utilisateur pour réinitialisation
 *               password:
 *                 type: string
 *                 description: Nouveau mot de passe
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé et activé avec succès
 */
router.post(`${route}/pwsd`, ctrl.activeAndPasswd);

/**
 * @swagger
 * /api/beauty/users/employes:
 *   get:
 *     summary: Liste tous les employés
 *     description: Récupère une liste de tous les employés enregistrés.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numéro de la page pour la pagination (commence à 0)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Nombre d'utilisateurs par page
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Terme de filtrage appliqué aux utilisateurs
 *     responses:
 *       200:
 *         description: Liste paginée des utilisateurs récupérée avec succès
 */
router.get(`${route}/employes`, ctrl.findAllEmp);

/**
 * @swagger
 * /api/beauty/users/{id}:
 *   delete:
 *     summary: desactive User
 *     description: desactive User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: user a desactiver
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès
 *       400:
 *         description: Requête invalide, rôle vide
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete(`${route}/:id`, ctrl.desactiveUser);

module.exports = router;
