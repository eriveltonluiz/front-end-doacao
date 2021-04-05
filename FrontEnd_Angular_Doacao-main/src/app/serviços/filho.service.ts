import { ObjFilho } from './../model/obj-filho';
import { Filho } from 'src/app/model/filho';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escola } from '../model/escola';
import { FilhoMaterial } from '../model/filho-material';
import { Material } from '../model/material';
import { Cep } from '../model/cep';

const baseUrlJava = 'http://localhost:8090/filho/';
const baseUrlJavaEscola = 'http://localhost:8090/escola/';
const baseUrlFilhoMaterial = 'http://localhost:3000/filhomaterial/';

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

  listarMateriaisFilhos(): Observable<Array<FilhoMaterial>>{
    return this.http.get<Array<FilhoMaterial>>(`${baseUrlFilhoMaterial}`)
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
