const mongoose = require('mongoose');

const deviceTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  } 
},{collection: 'devicetoken'});

const DeviceToken = mongoose.model('devicetoken', deviceTokenSchema);

module.exports = DeviceToken;