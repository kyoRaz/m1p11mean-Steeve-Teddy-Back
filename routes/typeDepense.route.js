var express = require('express');
var router = express.Router();
const ctrl = require('../controller/typeDepense.controller');


let route = '/typeDepenses';

/**
 * @swagger
 * /api/beauty/roles:
 *   post:
 *     summary: Crée un nouveau type de dépense
 *     description: Ajoute un nouveau type de dépense dans le système.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeDepense:
 *                 type: string
 *                 description: Libelle du type de dépense à créer
 *     responses:
 *       200:
 *         description: Type de dépense créé avec succès
 *       400:
 *         description: Requête invalide, type de dépense vide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post(`${route}`, ctrl.create);

/**
 * @swagger
 * /api/beauty/typeDepenses:
 *   get:
 *     summary: Liste tous les types de dépense
 *     description: Récupère une liste de tous les types de dépense disponibles.
 *     responses:
 *       200:
 *         description: Liste des types de dépense récupérées avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get(`${route}`, ctrl.findAll);

/**
 * @swagger
 * /api/beauty/typeDepenses/{id}:
 *   put:
 *     summary: Met à jour un type de dépense spécifique
 *     description: Met à jour le nom d'un type de dépense existant par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du type de dépense à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeDepense:
 *                 type: string
 *                 description: Nouveau nom du type de dépense
 *     responses:
 *       200:
 *         description: Type de dépense mis à jour avec succès
 *       400:
 *         description: Requête invalide, type de dépense vide
 *       500:
 *         description: Erreur interne du serveur
 */
router.put(`${route}/:id`, ctrl.update);

/**
 * @swagger
 * /api/beauty/typeDepenses/{id}:
 *   delete:
 *     summary: Supprime un type de dépense par son ID
 *     description: Supprime un type de dépense existant du système.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du type de dépense à supprimer
 *     responses:
 *       200:
 *         description: Type de dépense supprimé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete(`${route}/:id`, ctrl.delete);

module.exports = router;
