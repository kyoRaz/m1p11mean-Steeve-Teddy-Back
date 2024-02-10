var express = require('express');
var router = express.Router();
const ctrl = require('../controller/role.controller');


let route = '/roles';

/**
 * @swagger
 * /api/beauty/roles:
 *   post:
 *     summary: Crée un nouveau rôle
 *     description: Ajoute un nouveau rôle dans le système.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: Nom du rôle à créer
 *     responses:
 *       200:
 *         description: Rôle créé avec succès
 *       400:
 *         description: Requête invalide, rôle vide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post(`${route}`, ctrl.create);

/**
 * @swagger
 * /api/beauty/roles:
 *   get:
 *     summary: Liste tous les rôles
 *     description: Récupère une liste de tous les rôles disponibles.
 *     responses:
 *       200:
 *         description: Liste des rôles récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get(`${route}`, ctrl.findAll);

/**
 * @swagger
 * /api/beauty/roles/{id}:
 *   put:
 *     summary: Met à jour un rôle spécifique
 *     description: Met à jour le nom d'un rôle existant par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du rôle à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: Nouveau nom du rôle
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès
 *       400:
 *         description: Requête invalide, rôle vide
 *       500:
 *         description: Erreur interne du serveur
 */
router.put(`${route}/:id`, ctrl.update);

/**
 * @swagger
 * /api/beauty/roles/{id}:
 *   delete:
 *     summary: Supprime un rôle par son ID
 *     description: Supprime un rôle existant du système.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du rôle à supprimer
 *     responses:
 *       200:
 *         description: Rôle supprimé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete(`${route}/:id`, ctrl.delete);

module.exports = router;
