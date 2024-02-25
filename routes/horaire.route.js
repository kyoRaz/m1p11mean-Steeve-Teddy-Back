var express = require('express');
var router = express.Router();
const ctrl = require('../controller/horaire.controller');
const { auth } = require('../helpers/auth');

let route = '/horaires';
/**
 * @swagger
 * /api/beauty/horaires:
 *   post:
 *     summary: Crée une nouvelle entrée d'horaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idEmploye
 *               - heureDebut
 *               - heureFin
 *               - pauseDebut
 *               - pauseFin
 *             properties:
 *               idEmploye:
 *                 type: string
 *                 description: Identifiant de l'employé
 *               heureDebut:
 *                 type: string
 *                 example: "09:00:00"
 *                 description: Heure de début de l'horaire
 *               heureFin:
 *                 type: string
 *                 example: "09:00:00"
 *                 description: Heure de fin de l'horaire
 *               pauseDebut:
 *                 type: string
 *                 example: "09:00:00"
 *                 description: Heure de début de la pause
 *               pauseFin:
 *                 type: string
 *                 example: "09:00:00"
 *                 description: Heure de fin de la pause
 *     responses:
 *       200:
 *         description: Succès
 */
router.post(`${route}`, [auth], ctrl.create);
/**
 * @swagger
 * /api/beauty/horaires:
 *   get:
 *     summary: Récupère toutes les entrées d'horaire
 *     responses:
 *       200:
 *         description: Une liste d'horaires
 */
router.get(`${route}`, [auth], ctrl.findAll);
/**
 * @swagger
 * /api/beauty/horaires/check:
 *   get:
 *     summary: Vérifie l'horaire pour un moment donné
 *     parameters:
 *       - in: query
 *         name: heureClient
 *         schema:
 *           type: string
 *         required: true
 *         description: L'heure client à vérifier contre les horaires
 *     responses:
 *       200:
 *         description: Taille et résultat de la vérification
 */
router.get(`${route}/check`, [auth], ctrl.checkHoraire);
router.get(`${route}/dispoUser`, [auth], ctrl.dispoUser);

/**
 * @swagger
 * /dispoUserWithNoService:
 *   get:
 *     summary: Recherche les disponibilités d'utilisateur sans service
 *     description: Retourne une liste des disponibilités des utilisateurs qui n'ont pas de service durant la période spécifiée.
 *     parameters:
 *       - in: query
 *         name: debutService
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Heure de début du service au format ISO 8601.
 *       - in: query
 *         name: finService
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Heure de fin du service au format ISO 8601.
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date pour laquelle les disponibilités sont recherchées, au format YYYY-MM-DD.
 *     responses:
 *       200:
 *         description: Une liste des disponibilités trouvées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 size:
 *                   type: integer
 *                   description: Le nombre de disponibilités trouvées.
 *                 resultat:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       # Définissez ici les propriétés spécifiques de votre objet de disponibilité
 *                       # Exemple :
 *                       userId:
 *                         type: string
 *                         description: L'identifiant de l'utilisateur.
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                         description: Heure de début de la disponibilité.
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                         description: Heure de fin de la disponibilité.
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error Server"
 */
router.get(`${route}/dispoUserWithNoService`, [auth], ctrl.dispoUserWithNoService);

/**
 * @swagger
 * /api/beauty/horaires/employe/{id}:
 *   get:
 *     summary: Trouve un seul horaire par son IDEmploye
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'horaire à trouver
 *     responses:
 *       200:
 *         description: L'horaire trouvé
 *       404:
 *         description: Horaire non trouvé
 */
router.get(`${route}/employe/:id`, [auth], ctrl.findByEmp);

/**
 * @swagger
 * /api/beauty/horaires/{id}:
 *   get:
 *     summary: Trouve un seul horaire par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'horaire à trouver
 *     responses:
 *       200:
 *         description: L'horaire trouvé
 *       404:
 *         description: Horaire non trouvé
 */
router.get(`${route}/:id`, [auth], ctrl.findOne);
/**
 * @swagger
 * /api/beauty/horaires/{id}:
 *   put:
 *     summary: Met à jour un horaire par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'horaire à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               heureDebut:
 *                 type: string
 *                 example: "09:00:00"
 *               heureFin:
 *                 type: string
 *                 example: "09:00:00"
 *               pauseDebut:
 *                 type: string
 *                 example: "09:00:00"
 *               pauseFin:
 *                 type: string
 *                 example: "09:00:00"
 *     responses:
 *       200:
 *         description: L'horaire mis à jour
 */
router.put(`${route}/:id`, [auth], ctrl.update);
/**
 * @swagger
 * /api/beauty/horaire/{id}:
 *   delete:
 *     summary: Supprime un horaire par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'horaire à supprimer
 *     responses:
 *       200:
 *         description: Message de confirmation de suppression
 */
router.delete(`${route}/:id`, [auth], ctrl.delete);





module.exports = router;
