const userService = require('../services/utilisateur.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || email == "") {
            return res.status(400).json({
                message: "Bad Request",
                details: {
                    field: "email",
                    reason: "input email vide "
                }
            })
        }

        if (!password || password == "") {
            return res.status(400).json({
                message: "Bad Request",
                details: {
                    field: "erreur password",
                    reason: "input password vide "
                }
            })
        }

        let user = await userService.finbByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        if (!user.estActif && user.removed == false) {
            return res.status(403).json({ message: 'Compte desactivé' });
        } else {
            // Compare the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Mot  de passe  erroné' });
            }

            // Create a JWT
            let payload = { id: user._id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            user = userService.withoutPassword(user);
            return res.status(200).json({
                token,
                user
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }

}