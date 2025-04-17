const {decrypt} = require('./script')

const decodedPayload = decrypt(encryptedToken);
console.log("decoded is", decodedPayload)