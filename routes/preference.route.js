var express = require('express');
var router = express.Router();
const ctrl = require('../controller/preference.controller');


let route = '/prefs';

/**
 * @swagger
 * /api/beauty/prefs:
 *   post:
 *     summary: Crée une nouvelle préférence
 *     description: Permet de créer une nouvelle entrée de préférence pour un utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 description: Identifiant de l'utilisateur
 *               idService:
 *                 type: string
 *                 description: Identifiant du service
 *               idEmpFav:
 *                 type: string
 *                 description: Identifiant de l'employé favori
 *     responses:
 *       200:
 *         description: Préférence créée avec succès.
 *       400:
 *         description: Erreur de création de la préférence.
 */
router.post(`${route}`, ctrl.create);
/**
 * @swagger
 * /api/beauty/prefs:
 *   get:
 *     summary: Liste toutes les préférences
 *     description: Récupère une liste de toutes les préférences enregistrées.
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès.
 *       404:
 *         description: Aucune préférence trouvée.
 */
router.get(`${route}`, ctrl.findAll);
/**
 * @swagger
 * /api/beauty/prefs/{id}:
 *   put:
 *     summary: Met à jour une préférence spécifique
 *     description: Met à jour les informations d'une préférence existante par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la préférence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idService:
 *                 type: string
 *                 description: Identifiant du service mis à jour
 *               idEmpFav:
 *                 type: string
 *                 description: Identifiant de l'employé favori mis à jour
 *     responses:
 *       200:
 *         description: Préférence mise à jour avec succès.
 *       404:
 *         description: Préférence non trouvée.
 */
router.put(`${route}/:id`, ctrl.update);
/**
 * @swagger
 * /api/beauty/prefs/{id}:
 *   delete:
 *     summary: Supprime une préférence spécifique
 *     description: Supprime les informations d'une préférence existante par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la préférence à supprimer
 *     responses:
 *       200:
 *         description: Préférence supprimée avec succès.
 *       404:
 *         description: Préférence non trouvée.
 */
router.delete(`${route}/:id`, ctrl.delete);

module.exports = router;
