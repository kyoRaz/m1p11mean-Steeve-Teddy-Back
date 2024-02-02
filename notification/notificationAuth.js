const admin = require('firebase-admin');

const serviceAccount = require('../configuration/keys.json');
// AAAAS30hc14:APA91bFVwEeFtCCiWmn_uRRcxYA3ixiPpXPTDuieKsp50EDIYftRcyjgsNru3FiqIVfxJW32Bp0TqzAL3cdstBqlIljc6ipVLiuRLrm5POOibltethK-6hvt8fTrnVSo2ISEbW8a3Wg3
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

