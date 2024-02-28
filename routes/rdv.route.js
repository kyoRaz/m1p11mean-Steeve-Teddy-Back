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
 * /api/beauty/rdvs/config:
 *   post:
 *     summary: Configure un rendez-vous
 *     description: Permet de configurer les détails d'un rendez-vous en spécifiant les services et les employés.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateRdv:
 *                 type: string
 *                 format: date
 *                 description: La date et l'heure du rendez-vous.
 *               heureRdv:
 *                 type: string
 *                 example: "09:00:00"
 *                 description: L'heure du rendez-vous au format HH:mm:ss.
 *               listDetails:
 *                 type: array
 *                 description: Liste des détails du service pour le rendez-vous.
 *                 items:
 *                   type: object
 *                   properties:
 *                     idService:
 *                       type: string
 *                       description: Identifiant du service.
 *                     idEmploye:
 *                       type: string
 *                       description: Identifiant de l'employé assigné au service.
 *                     debutService:
 *                       type: string
 *                       example: "09:00:00"
 *                       description: Heure de début du service.
 *                     finService:
 *                       type: string
 *                       example: "09:00:00"
 *                       description: Heure de fin du service.
 *     responses:
 *       200:
 *         description: Rendez-vous configuré avec succès.
 *       400:
 *         description: Données fournies invalides ou incomplètes.
 */
router.post(`${route}/config`, ctrl.programmerRdv);
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
 * /api/beauty/rdvs/historique:
 *   get:
 *     summary: Récupérer l'historique des rendez-vous de l'utilisateur
 *     tags: [Historique]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Numéro de la page à afficher
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: dateDebut
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de début de l'intervalle pour l'historique des rendez-vous
 *       - in: query
 *         name: dateFin
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de fin de l'intervalle pour l'historique des rendez-vous
 *     responses:
 *       '200':
 *         description: Succès. Retourne l'historique des rendez-vous de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 size:
 *                   type: integer
 *                   description: Nombre total de résultats.
 *                 resultat:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RendezVous'
 *       '500':
 *         description: Erreur Serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get(`${route}/historique`, ctrl.historiqueRdvUser);

/**
 * @swagger
 * /api/beauty/rdvs/historiqueDetail/{idRdv}:
 *   get:
 *     summary: Récupérer les détails d'un rendez-vous
 *     tags: [Historique]
 *     parameters:
 *       - in: path
 *         name: idRdv
 *         required: true
 *         description: L'ID du rendez-vous pour lequel récupérer les détails
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Succès. Retourne les détails du rendez-vous.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/Detail'
 *       '404':
 *         description: Entité introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Erreur Serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get(`${route}/historiqueDetail/:idRdv`, ctrl.findDetails);


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

/**
 * @swagger
 * /api/beauty/rdvs/{id}:
 *   post:
 *     summary: Met à jour un rendez-vous par son ID
 *     description: Met à jour les informations d'un rendez-vous existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du rendez-vous à mettre à jour.
 *     
 *     responses:
 *       200:
 *         description: Rendez-vous payer avec succès.
 *       400:
 *         description: Requête invalide, informations manquantes ou incorrectes.
 */
router.post(`${route}/payer/:id`, ctrl.payerRdv);

module.exports = router;
