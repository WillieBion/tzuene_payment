import CryptoJS from "crypto-js"
import crypto from 'crypto'

export const encryptObject = (jsonObject: any, sk: string) => {

  const encryptedResponse = CryptoJS.AES.encrypt(JSON.stringify(jsonObject), sk).toString();
  //log encryptedData

  // console.log('Encrypted Response: ', encryptedResponse);

  return { data: encryptedResponse }

}
export const cryptoEncryption = (dataToEncrypt: string, publicKey: string) => {
  const cipherText = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(dataToEncrypt, 'utf8')
  ).toString('base64');
  return cipherText
}

export const cyprtoDecryption = (dataToDecrypt: string, privateKey: string) => {
  const plainText = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(dataToDecrypt, 'base64')
  ).toString('utf8');

  try {
 const parsedJson =  JSON.parse(plainText)
    return parsedJson
  } catch (error) {
    console.error("Failed to parse decrypted text:", plainText);
    // return plainText
  }
  // return plainText
}



export const decryptObject = (encryptedData: string, sk: string): any => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, sk);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

  console.log('Decrypted Text: ', decryptedText);

  // Optional: handle malformed JSON or invalid decryption
  // try {
  //   return JSON.parse(decryptedText);
  // } catch (error) {
  //   console.error("Failed to parse decrypted text:", decryptedText);
  //   return null;
  // }
};