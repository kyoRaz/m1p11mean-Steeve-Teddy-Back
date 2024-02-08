



const createDoubleNonNull = (monObjet) => {
    // Récupérer les entrées non-nulles de l'objet original
    const entreesNonNulles = Object.entries(monObjet).filter(([_, valeur]) => valeur !== null);
    // Créer un nouvel objet avec les entrées non-nulles
    const nouvelObjet = Object.fromEntries(entreesNonNulles);
    delete nouvelObjet.id;
    return nouvelObjet;
}


const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


const isValidNumero = (variable) => {
    // Vérifie si la variable contient exactement 10 chiffres
    return /^\d{10}$/.test(variable);
}

const isValidPassword = (password, confirmPWD) => {
    let rep;
    if (password && confirmPWD && password === confirmPWD) {
        rep = true;
    } else {
        rep = false;
    }
    return rep;
}

const isValidMinimumLength = (variable) => {
    return variable.length >= 8;
}

const estDateInferieure = (date1, date2) => {
    // Convertir les chaînes de date en objets Date
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);

    // Comparer les dates
    return dateObj1 < dateObj2;
}

const estInfCurrentDate = (date1) => {
    // Convertir les chaînes de date en objets Date
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date();

    // Comparer les dates
    return dateObj1 < dateObj2;
}

function casteNbr(str) {
    if (typeof str === 'string') {
        if (/^\d/.test(str)) {
            const nombre = parseFloat(str);
            if (!isNaN(nombre)) {
                return nombre;
            } else {
                throw new Error('La chaîne ne peut pas être castée en nombre.');
            }
        } else {
            throw new Error('La chaîne ne commence pas par un chiffre.');
        }
    } else {
        return str;
    }
}

const ajusterHeureDate = (dateObjet, heureString) => {

    let composantesHeure = heureString.split(":");

    if (composantesHeure.length === 3) {
        dateObjet.setHours(parseInt(composantesHeure[0])); // Heures
        dateObjet.setMinutes(parseInt(composantesHeure[1])); // Minutes
        dateObjet.setSeconds(parseInt(composantesHeure[2])); // Secondes
    } else {
        throw new Error("Format de l'heure invalide. Assurez-vous que le format est HH:MM:SS.");
    }

    return dateObjet;
}

const valideFormatHeure = (heureString) => {
    const regexHeure = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/;
    return regexHeure.test(heureString);
}


const controlIntervalDate = (req, res) => {
    try {
        let { dateDebut, dateFin } = req.query;
        let debut;
        if (dateDebut) {
            debut = new Date(dateDebut);
            if (isNaN(debut.getTime())) {
                res.status(400).json({ message: "Bad Request ", details: "La dateDebut fournie n est pas valide" });
                return false;
            }
        }
        let fin;
        if (dateFin) {
            fin = new Date(dateFin);
            if (isNaN(fin.getTime())) {
                res.status(400).json({ message: "Bad Request ", details: "La dateFin fournie n est pas valide" });
                return false;
            }
        }
        if (debut && fin && debut >= fin) {
            res.status(400).json({ message: "Bad Request ", details: "La date de début doit être antérieure à la date de fin" });
            return false;
        }
        return true;
    } catch (error) {
        throw error;
    }
}

const heuretAnterieur = (heure1, heure2) => {
    const regex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;

    if (!regex.test(heure1) || !regex.test(heure2)) {
        throw new Error("Format invalide. Les heures doivent être au format HH:mm:ss.");
    }

    const dateBase = '1970-01-01';
    const heure1Obj = new Date(`${dateBase}T${heure1}Z`);
    const heure2Obj = new Date(`${dateBase}T${heure2}Z`);

    // return heure2Obj >= heure1Obj;
    return heure1Obj >= heure2Obj;
}


function addTimes(time1, time2) {
    const toSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const totalSeconds = toSeconds(time1) + toSeconds(time2);

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

module.exports = {
    createDoubleNonNull,
    isValidEmail,
    isValidNumero,
    isValidPassword,
    isValidMinimumLength,
    estDateInferieure,
    estInfCurrentDate,
    casteNbr,
    ajusterHeureDate,
    valideFormatHeure,
    controlIntervalDate,
    heuretAnterieur,
    addTimes
}
