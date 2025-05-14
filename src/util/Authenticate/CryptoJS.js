import moment from "moment";
const SECRET_KEY = "11A1764225B11AA1"
// utils secretKEY = 123456789abcdef
// const SECRET_KEY = "11A1764225B11AA1"


export const handleFirstNameChanges = (event,firstNameKey,middleNameKey,lastNameKey,setValue) => {
    setValue(firstNameKey,event.target.value)
    // console.log("first name length ",event.target.value?.length)
    if(event.target.value?.length > 30){
      setValue(middleNameKey,"")
      setValue(lastNameKey,"")
    }
  }


export const getMAskedMobileNumber = (mobileNumber) => {
  if(!mobileNumber && mobileNumber.toString().length < 5){
    return mobileNumber
  }
  return `${mobileNumber.slice(0, 4)}...${mobileNumber.slice(-3)}`;
}

export const encryptData = (originalText) => {
  try{
    // if(originalText){
    //   // console.log("EncryptDecrypt encryptData before ",originalText)
    //   let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(originalText), SECRET_KEY).toString()
    //   return CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex).replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l').replace(/%/g,'z2a2m3A4l');
    // }    
    return originalText
  }catch(error){
    // console.log("Error in encryptData ",originalText, error)
  }
  
}

export const decryptData = (encryptText) =>{
  try{
    // if(encryptText){
      
    //   let decoded = CryptoJS.enc.Hex.parse(encryptText.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=').replace(/z2a2m3A4l/g,'%')).toString(CryptoJS.enc.Base64);
      
    //   return CryptoJS.AES.decrypt(decoded, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    // }
    return encryptText
  }catch(error){
    // console.log("Error in decryptData ",encryptText, error)
  }
  
}
   
export const encrypt = (originalText) => {
  //  if(originalText){
  //  // Fix: Use the Utf8 encoder
  //  let text = CryptoJS.enc.Utf8.parse(originalText); 
  //  // Fix: Use the Utf8 encoder (or apply in combination with the hex encoder a 32 hex digit key for AES-128)
  //  let key = CryptoJS.enc.Utf8.parse(SECRET_KEY); 

  //  let encrypted = CryptoJS.AES.encrypt(text, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }); 
  //  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l').replace(/%/g,'z1L2a3S4h');
  //  }
   return originalText
  }
  export const decrypt = (encryptedText) => {
    // if (encryptedText) {
    //     // Reverse the character replacements done in encryption
    //     let formattedText = encryptedText
    //         .replace(/p1L2u3S/g, '+')
    //         .replace(/s1L2a3S4h/g, '/')
    //         .replace(/e1Q2u3A4l/g, '=')
    //         .replace(/z1L2a3S4h/g, '%');

    //     // Convert the hex string back to WordArray
    //     let encryptedWords = CryptoJS.enc.Hex.parse(formattedText);
    //     let key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

    //     // Decrypt the text
    //     let decrypted = CryptoJS.AES.decrypt(
    //         { ciphertext: encryptedWords },
    //         key,
    //         { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }
    //     );

    //     return decrypted.toString(CryptoJS.enc.Utf8);
    // }
    return encryptedText;
};


