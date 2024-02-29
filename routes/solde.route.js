var express = require('express');
var router = express.Router();
const ctrl = require('../controller/solde.controller');


let route = '/soldes';
/**
 * @swagger
 * /soldes/{idUser}:
 *   get:
 *     summary: Obtient le solde pour un utilisateur donné.
 *     description: Récupère le solde pour un utilisateur spécifié par son ID.
 *     tags:
 *       - Soldes
 *     parameters:
 *       - in: path
 *         name: idUser
 *         description: ID de l'utilisateur pour lequel récupérer le solde.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès. Le solde a été récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                 solde:
 *                   type: object
 *                   description: Détails du solde récupéré.
 *       404:
 *         description: Utilisateur non trouvé. Aucun solde trouvé pour l'utilisateur spécifié.
 *       500:
 *         description: Erreur serveur. Une erreur est survenue lors de la récupération du solde.
 */
router.get(`${route}/:idUser`, ctrl.getSolde);

/**
 * @swagger
 * /soldes:
 *   post:
 *     summary: Crée un nouveau solde.
 *     description: Crée un nouveau solde pour un utilisateur donné.
 *     tags:
 *       - Soldes
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Objet JSON représentant les données du solde à créer.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             montant:
 *               type: number
 *               description: Montant du solde à créer.
 *             idUser:
 *               type: string
 *               description: ID de l'utilisateur pour lequel créer le solde.
 *     responses:
 *       200:
 *         description: Succès. Le solde a été créé avec succès.
 *       400:
 *         description: Erreur de demande. Les données de la requête sont invalides.
 *       500:
 *         description: Erreur serveur. Une erreur est survenue lors de la création du solde.
 */
router.post(`${route}`, ctrl.create);

module.exports = router;