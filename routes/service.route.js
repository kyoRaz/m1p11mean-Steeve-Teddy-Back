var express = require('express');
var router = express.Router();
const ctrl = require('../controller/service.controller');


let route = '/services';

/**
 * @swagger
 * /api/beauty/services:
 *   post:
 *     summary: Crée un nouveau service
 *     description: Permet de créer un service avec les détails fournis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom du service
 *               delai:
 *                 type: string
 *                 description: Délai du service au format HH:mm:ss
 *               prix:
 *                 type: number
 *                 description: Prix du service
 *               commission:
 *                 type: number
 *                 description: Commission sur le service
 *     responses:
 *       200:
 *         description: Service créé avec succès
 *       400:
 *         description: Requête invalide
 */
router.post(`${route}`, ctrl.create);

/**
 * @swagger
 * /api/beauty/services:
 *   get:
 *     summary: Liste tous les services
 *     description: Récupère une liste de tous les services disponibles.
 *     responses:
 *       200:
 *         description: Liste des services récupérée avec succès
 */
router.get(`${route}`, ctrl.findAll);
/**
 * @swagger
 * /api/beauty/services/{id}:
 *   put:
 *     summary: Met à jour un service spécifique
 *     description: Met à jour les détails d'un service existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du service à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nouveau nom du service
 *               delai:
 *                 type: string
 *                 description: Nouveau délai du service au format HH:mm:ss
 *               prix:
 *                 type: number
 *                 description: Nouveau prix du service
 *               commission:
 *                 type: number
 *                 description: Nouvelle commission sur le service
 *     responses:
 *       200:
 *         description: Service mis à jour avec succès
 */
router.put(`${route}/:id`, ctrl.update);
/**
 * @swagger
 * /api/beauty/services/{id}:
 *   delete:
 *     summary: Supprime un service par son ID
 *     description: Supprime un service existant du système.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du service à supprimer
 *     responses:
 *       200:
 *         description: Service supprimé avec succès
 */
router.delete(`${route}/:id`, ctrl.delete);

module.exports = router;
