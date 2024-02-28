const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

// const secret = process.env.JWT_SECRET || "";
const secret = "amazing";

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send({
            status: 401,
            success: false,
            result: "Accès refusé. Aucun token fourni.",
        });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).send({
            status: 401,
            success: false,
            result: "Accès refusé.Token fourni expiré",
        });
        return;
    }
};

const authorizeRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.roles || !roles.some(role => req.user.roles.includes(role))) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};

const generateActivationToken = () => {
    const tokenActivation = crypto.randomBytes(20).toString('hex');
    const expirationToken = Date.now() + 24 * 60 * 60 * 1000;
    return { tokenActivation, expirationToken }
}


module.exports = {
    auth,
    authorizeRoles,
    generateActivationToken
};
