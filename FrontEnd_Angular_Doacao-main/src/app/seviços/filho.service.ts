import { Filho } from 'src/app/model/filho';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escola } from '../model/escola';
import { Estado } from '../model/estado';

const baseUrl = 'http://localhost:3000/filho/';
const baseUrlEstado = 'http://localhost:3000/estado/';
const baseUrlEscola = 'http://localhost:3000/escola/';

@Injectable({
  providedIn: 'root'
})
export class FilhoService {

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(baseUrlEstado);
  }

  listarFilhos(): Observable<Array<Filho>> {
    return this.http.get<Array<Filho>>(baseUrl);
  }

  buscarFilhoPorID(id: number): Observable<Filho>{
    return this.http.get<Filho>(`${baseUrl}/${id}`);
  }

  salvarFilho(filho: Filho): Observable<Filho> {
    return this.http.post<Filho>(baseUrl, filho);
  }

  editarFilho(filho: Filho): Observable<Filho> {
    return this.http.put<Filho>(`${baseUrl}/${filho.id}`, filho);
  }

  salvarEscola(escola: Escola): Observable<Escola> {
    return this.http.post<Escola>(baseUrlEscola, escola);
  }

  editarEscola(escola: Escola): Observable<Escola> {
    return this.http.put<Escola>(`${baseUrlEscola}/${escola.id}`, escola);
  }

  excluirFilho(id: number): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${id}`);
  }
}
