var express = require('express');
var router = express.Router();
const ctrl = require('../controller/login.controller');


let route = '/login';

/**
 * @swagger
 * /api/beauty/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     description: Cette route permet à un utilisateur de se connecter en fournissant ses identifiants.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - motDePasse
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse email de l'utilisateur
 *               motDePasse:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne le token d'authentification.
 *       401:
 *         description: Authentification échouée, identifiants invalides.
 */
router.post(`${route}`, ctrl.auth);

module.exports = router;
