import { Injectable } from '@angular/core';
import { Pai } from '../model/pai';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  logar(pai: Pai){
    localStorage.setItem('id', JSON.stringify(pai.email));
  }
}
