class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError'; // Définir le nom de l'erreur
    }

}

module.exports = {
    ValidationError
}