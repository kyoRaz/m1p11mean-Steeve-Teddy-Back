



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


module.exports = {
    createDoubleNonNull,
    isValidEmail,
    isValidNumero,
    isValidPassword,
    isValidMinimumLength,
    estDateInferieure,
    estInfCurrentDate,
    casteNbr,
}
