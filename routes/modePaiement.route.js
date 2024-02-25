var express = require('express');
var router = express.Router();
const ctrl = require('../controller/modePaiement.controller');
const { auth } = require('../helpers/auth');

let route = '/modePaiements';

/**
 * @swagger
 * /api/beauty/roles:
 *   post:
 *     summary: Crée un nouveau mode de paiement
 *     description: Ajoute un nouveau mode de paiement dans le système.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modePaiement:
 *                 type: string
 *                 description: Libelle du mode de paiement à créer
 *     responses:
 *       200:
 *         description: Mode de paiement créé avec succès
 *       400:
 *         description: Requête invalide, mode de paiement vide
 *       500:
 *         description: Erreur interne du serveur
 */
router.post(`${route}`, [auth], ctrl.create);

/**
 * @swagger
 * /api/beauty/modePaiements:
 *   get:
 *     summary: Liste tous les modes de paiement
 *     description: Récupère une liste de tous les modes de paiement disponibles.
 *     responses:
 *       200:
 *         description: Liste des modes de paiement récupérées avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get(`${route}`, [auth], ctrl.findAll);

/**
 * @swagger
 * /api/beauty/modePaiements/{id}:
 *   put:
 *     summary: Met à jour un mode de paiement spécifique
 *     description: Met à jour le nom d'un mode de paiement existant par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du mode de paiement à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modePaiement:
 *                 type: string
 *                 description: Nouveau nom du mode de paiement
 *     responses:
 *       200:
 *         description: Mode de paiement mis à jour avec succès
 *       400:
 *         description: Requête invalide, mode de paiement vide
 *       500:
 *         description: Erreur interne du serveur
 */
router.put(`${route}/:id`, [auth], ctrl.update);

/**
 * @swagger
 * /api/beauty/modePaiements/{id}:
 *   delete:
 *     summary: Supprime un mode de paiement par son ID
 *     description: Supprime un mode de paiement existant du système.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du mode de paiement à supprimer
 *     responses:
 *       200:
 *         description: Mode de paiement supprimé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete(`${route}/:id`, [auth], ctrl.delete);

module.exports = router;
