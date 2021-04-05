import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Pai } from '../model/pai';
import { HttpClient } from '@angular/common/http';

const baseUrlJava = 'http://localhost:8090/login/';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient) { }

  logar(pai: Pai){
    localStorage.clear();
    this.http.post<Pai>(baseUrlJava + 'logar', pai).subscribe(p => {
      console.log(p)
      if(p === null || p === undefined){
        alert('Erro ao se logar. Senha ou o email incorretos');
      } else{
        localStorage.setItem('id', JSON.stringify(p.id));
        this.router.navigate(['/listfilho']);
      }
    })
  }

  retornarPai(id: number): Observable<Pai> {
    return this.http.get<Pai>(baseUrlJava + id);
  }

  salvarPai(pai: Pai): Observable<Pai> {
    return this.http.post<Pai>(baseUrlJava, pai);
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
