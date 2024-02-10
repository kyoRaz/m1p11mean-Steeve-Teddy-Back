var express = require('express');
var router = express.Router();
const ctrl = require('../controller/rdv.controller');


let route = '/rdvs';

/**
 * @swagger
 * /api/beauty/rdvs:
 *   post:
 *     summary: Crée un nouveau rendez-vous
 *     description: Permet à l'utilisateur de programmer un nouveau rendez-vous.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateRdv:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure du rendez-vous, doit être au format DateTime valide.
 *     responses:
 *       200:
 *         description: Rendez-vous créé avec succès.
 *       400:
 *         description: Requête invalide, informations manquantes ou incorrectes.
 */
router.post(`${route}`, ctrl.create);
/**
 * @swagger
 * /api/beauty/rdvs:
 *   get:
 *     summary: Liste tous les rendez-vous
 *     description: Récupère une liste de tous les rendez-vous programmés.
 *     responses:
 *       200:
 *         description: Liste des rendez-vous récupérée avec succès.
 */
router.get(`${route}`, ctrl.findAll);
/**
 * @swagger
 * /api/beauty/rdvs/{id}:
 *   get:
 *     summary: Trouve un rendez-vous par son ID
 *     description: Récupère les détails d'un rendez-vous spécifique par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du rendez-vous.
 *     responses:
 *       200:
 *         description: Détails du rendez-vous.
 *       404:
 *         description: Rendez-vous non trouvé.
 */
router.get(`${route}/:id`, ctrl.findOne);
/**
 * @swagger
 * /api/beauty/rdvs/{id}:
 *   put:
 *     summary: Met à jour un rendez-vous par son ID
 *     description: Met à jour les informations d'un rendez-vous existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du rendez-vous à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateRdv:
 *                 type: string
 *                 format: date-time
 *                 description: La nouvelle date et heure du rendez-vous, doit être au format DateTime valide.
 *     responses:
 *       200:
 *         description: Rendez-vous mis à jour avec succès.
 *       400:
 *         description: Requête invalide, informations manquantes ou incorrectes.
 */
router.put(`${route}/:id`, ctrl.update);

/**
 * @swagger
 * /api/beauty/rdvs/{id}:
 *   delete:
 *     summary: Supprime un rendez-vous par son ID
 *     description: Supprime un rendez-vous existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du rendez-vous à supprimer.
 *     responses:
 *       200:
 *         description: Rendez-vous supprimé avec succès.
 */
router.delete(`${route}/:id`, ctrl.delete);

module.exports = router;
