const { encrypt } = require("./script");

const payload = {userId: 699, role: "dada"};
const encryptedToken = encrypt(payload);
console.log('successful', encryptedToken)