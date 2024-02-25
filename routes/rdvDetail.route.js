var express = require('express');
var router = express.Router();
const ctrl = require('../controller/rdvDetail.controller');
const { auth } = require('../helpers/auth');

let route = '/rdvDetails';

/**
 * @swagger
 * /api/beauty/rdvDetails:
 *   post:
 *     summary: Crée un détail de rendez-vous
 *     description: Ajoute un détail pour un rendez-vous existant avec les informations spécifiques fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRdv:
 *                 type: string
 *                 description: Identifiant du rendez-vous associé
 *               idService:
 *                 type: string
 *                 description: Identifiant du service fourni lors du rendez-vous
 *               idEmploye:
 *                 type: string
 *                 description: Identifiant de l'employé assigné au service
 *               debutService:
 *                 type: string
 *                 format: date
 *                 description: Heure de début du service (format HH:mm:ss)
 *               finService:
 *                 type: string
 *                 format: date
 *                 description: Heure de fin du service (format HH:mm:ss)
 *     responses:
 *       200:
 *         description: Détail de rendez-vous créé avec succès
 *       400:
 *         description: Données fournies invalides ou incomplètes
 */
router.post(`${route}`, [auth], ctrl.create);

/**
 * @swagger
 * /api/beauty/rdvDetails:
 *   get:
 *     summary: Liste tous les détails de rendez-vous
 *     description: Récupère une liste de tous les détails pour les rendez-vous.
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 */
router.get(`${route}`, [auth], ctrl.findAll);
/**
 * @swagger
 * /api/beauty/rdvDetails/filtre:
 *   get:
 *     summary: Filtre les détails de rendez-vous par intervalle de temps
 *     description: Récupère les détails de rendez-vous qui correspondent à un intervalle de temps spécifié.
 *     parameters:
 *       - in: query
 *         name: dateDebut
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: La date de début de l'intervalle
 *       - in: query
 *         name: dateFin
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: La date de fin de l'intervalle
 *     responses:
 *       200:
 *         description: Liste des détails de rendez-vous filtrée avec succès
 *       404:
 *         description: Aucun détail trouvé pour cet intervalle
 */
router.get(`${route}/filtre`, [auth], ctrl.findIntervale);

/**
 * @swagger
 * /api/beauty/rdvDetails/{id}:
 *   get:
 *     summary: Trouve un détail de rendez-vous par son ID
 *     description: Récupère les détails d'un rendez-vous spécifique par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du détail de rendez-vous
 *     responses:
 *       200:
 *         description: Détail de rendez-vous récupéré avec succès
 *       404:
 *         description: Détail de rendez-vous non trouvé
 */
router.get(`${route}/:id`, [auth], ctrl.findOne);

/**
 * @swagger
 * /api/beauty/rdvDetails/historique/{idUser}:
 *   get:
 *     summary: Trouve les historiques de rendez-vous par son ID
 *     description: Récupère les historiques de rendez-vous par son ID.
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détail de rendez-vous récupéré avec succès
 *       404:
 *         description: Détail de rendez-vous non trouvé
 */
router.get(`${route}/historique/:idUser`, [auth], ctrl.historiqueRdvUser);

/**
 * @swagger
 * /api/beauty/rdvDetails/commission/{idEmploye}:
 *   get:
 *     summary: Trouve les commissions de rendez-vous d'un employé
 *     description: Récupère les commissions de rendez-vous d'un employé.
 *     parameters:
 *       - in: path
 *         name: idEmploye
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'employé
 *     responses:
 *       200:
 *         description: 
 *       404:
 *         description: 
 */
router.get(`${route}/commission/:idEmploye`, [auth], ctrl.commissionObtenuEmploye);

/**
 * @swagger
 * /api/beauty/rdvDetails/{id}:
 *   put:
 *     summary: Met à jour un détail de rendez-vous par son ID
 *     description: Met à jour les informations d'un détail de rendez-vous existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du détail de rendez-vous à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idService:
 *                 type: string
 *                 description: Nouvel identifiant de service
 *               idEmploye:
 *                 type: string
 *                 description: Nouvel identifiant de l'employé
 *               heure:
 *                 type: string
 *                 description: Nouvelle heure prévue pour le service
 *     responses:
 *       200:
 *         description: Détail de rendez-vous mis à jour avec succès
 */
router.put(`${route}/:id`, [auth], ctrl.update);
/**
 * @swagger
 * /api/beauty/rdvDetails/{id}:
 *   delete:
 *     summary: Supprime un détail de rendez-vous par son ID
 *     description: Supprime les informations d'un détail de rendez-vous existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du détail de rendez-vous à supprimer
 *     responses:
 *       200:
 *         description: Détail de rendez-vous supprimé avec succès
 */
router.delete(`${route}/:id`, [auth], ctrl.delete);

module.exports = router;
