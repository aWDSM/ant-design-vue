import CryptoJs from "crypto-js";

export const encrypt = (unikey, uniiv, word) => {
  const key = CryptoJs.enc.Utf8.parse(unikey);
  const iv = CryptoJs.enc.Utf8.parse(uniiv);
  const srcs = JSON.stringify(word);
  return CryptoJs.AES.encrypt(srcs, key, {
    padding: CryptoJs.pad.Pkcs7,
    mode: CryptoJs.mode.CBC,
    iv,
  }).toString();
};

export const decrypt = (unikey, uniiv, word) => {
  const key = CryptoJs.enc.Utf8.parse(unikey);
  const iv = CryptoJs.enc.Utf8.parse(uniiv);
  const result = CryptoJs.AES.decrypt(word, key, {
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7,
    iv,
  });
  return CryptoJs.enc.Utf8.stringify(result).toString();
};
