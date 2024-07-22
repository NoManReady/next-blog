import CryptoJS from 'crypto-js'; // AES/DES加密
/**
 * @description: AES/DES密钥
 * @author: NoManReady
 */
const CRYPTO_KEY = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥
const CRYPTO_IV = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥偏移量

/**
 * @description: AES/DES加密
 * @param {string} password
 * @Author: NoManReady
 */
export const encryptionAesPsd = (password: string): string => {
  const encrypted = CryptoJS.AES.encrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // 返回的是base64格式的密文
};

/**
 * @description: AES/DES解密
 * @param {string} password
 * @Author: NoManReady
 */
export const decryptionAesPsd = (password: string): string => {
  const encrypted = CryptoJS.AES.decrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(CryptoJS.enc.Utf8); // 返回的是base64格式的密文
};
