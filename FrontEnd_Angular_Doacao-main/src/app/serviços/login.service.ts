import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Pai } from '../model/pai';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  logar(pai: Pai){
    localStorage.clear();
    localStorage.setItem('id', JSON.stringify(pai.email));
  }

  zerarLogin(){
    console.log(localStorage.getItem('id'))
      if(this.router.url === '/' && localStorage.getItem('id') !== null){
        console.log(localStorage.getItem('id'))
        localStorage.clear();
        return confirm('Necessário efetuar novamente o login!!')
      }
  }
}
