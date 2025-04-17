const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY=process.env.SECRET_KEY;
const ENCRYPTION_KEY=Buffer.from(process.env.ENCRYPTION_KEY, "utf-8");
const IV_LENGTH=parseInt(process.env.IV_LENGTH, 10);

const encrypt = (payload) => {
  // encrypt the payload and return token
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});

  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv("aes-128-cbc", ENCRYPTION_KEY, iv);

  let encrypted = cipher.update(token, "utf-8", "hex");

  encrypted += cipher.final("hex")

  return `${iv.toString("hex")}:${encrypted}`

}

const decrypt = (token) => {
  // return decoded payload
  const [ivHex, encryptedToken] = token.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createCipheriv("aes-128-cbc", ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedToken, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return jwt.verify(decrypted, SECRET_KEY);

}

module.exports = {
  encrypt,
  decrypt
}