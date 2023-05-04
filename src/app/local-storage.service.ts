import { Injectable } from '@angular/core';
import{BehaviorSubject, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  
  idLogged = new BehaviorSubject('');

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }

    return null;
  }

  set(key: string, value: any): boolean {
    
    if (this.isLocalStorageSupported) {
      if(key=='ID') this.idLogged.next(value);
      this.localStorage.setItem(key, JSON.stringify(value));

      return true;
    }

    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);

      return true;
    }

    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }
}