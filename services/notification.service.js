const admin = require('firebase-admin');

const sendNotificationToDevice = async (title, body, token) => {
    try {
        const message = {
            notification: {
                title: title,
                body: body
            },
            token: token
        };
        let response = await admin.messaging().send(message);
        return response
    } catch (error) {
        throw error;
    }
}

const sendNotificationToMultipleDevices = async (title, body, tokens) => {
    try {
        const message = {
            notification: {
                title: title,
                body: body
            },
            tokens: tokens
        };
        let response = await admin.messaging().sendEachForMulticast(message);
        return response
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendNotificationToDevice,
    sendNotificationToMultipleDevices
}