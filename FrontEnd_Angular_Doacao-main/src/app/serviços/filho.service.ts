import { Filho } from 'src/app/model/filho';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escola } from '../model/escola';
import { Cep } from '../model/cep';

const baseUrlJava = 'https://api-doacao.herokuapp.com/filho/';
const baseUrlJavaEscola = 'https://api-doacao.herokuapp.com/escola/';

@Injectable({
  providedIn: 'root'
})
export class FilhoService {

  constructor(private http: HttpClient) { }

  consultaCep(cep: string): Observable<Cep>{
    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`);
  }
 
  listarFilhos(): Observable<Array<Filho>> {
    return this.http.get<Array<Filho>>(baseUrlJava);
  }

  buscarFilhosPorID(id: number): Observable<Array<Filho>>{
    return this.http.get<Array<Filho>>(`${baseUrlJava}${id}`);
  }

  salvarFilho(filho: Filho): Observable<Filho> {
    return this.http.post<Filho>(baseUrlJava, filho);
  }

  editarFilho(filho: Filho): Observable<Filho> {
    return this.http.put<Filho>(`${baseUrlJava}`, filho);
  }

  excluirFilho(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrlJava}${id}`);
  }

  salvarEscola(escola: Escola): Observable<Escola> {
    return this.http.post<Escola>(baseUrlJavaEscola, escola);
  }

  editarEscola(escola: Escola): Observable<Escola> {
    return this.http.put<Escola>(`${baseUrlJavaEscola}`, escola);
  }

  buscarEscolaPorNome(nome: string): Observable<Escola>{
    return this.http.get<Escola>(`${baseUrlJavaEscola}${nome}`);
  }

}
