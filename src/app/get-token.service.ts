import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {
  plainText:string;  
  encryptText: string;  
  encPassword: string;  
  decPassword:'miaparola';  
  conversionEncryptOutput: string;  
  conversionDecryptOutput:string; 
  miosale:string; 
  constructor() { }

  encrypt(parola,sale){  
        
    this.conversionEncryptOutput = CryptoJS.AES.encrypt(parola, sale).toString();  
    return this.conversionEncryptOutput;

  }  

}
