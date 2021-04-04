import { ObjFilho } from './../model/obj-filho';
import { Filho } from 'src/app/model/filho';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Escola } from '../model/escola';
import { FilhoMaterial } from '../model/filho-material';
import { Material } from '../model/material';
import { Cep } from '../model/cep';

const baseUrl = 'http://localhost:3000/filho/';
const baseUrlEscola = 'http://localhost:3000/escola/';
const baseUrlMaterial = 'http://localhost:3000/material/';
const baseUrlFilhoMaterial = 'http://localhost:3000/filhomaterial/';

@Injectable({
  providedIn: 'root'
})
export class FilhoService {

  constructor(private http: HttpClient) { }

  consultaCep(cep: string): Observable<Cep>{
    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  listarMateriais(): Observable<Material[]> {
    return this.http.get<Material[]>(baseUrlMaterial);
  }

  listarFilhos(): Observable<Array<Filho>> {
    return this.http.get<Array<Filho>>(baseUrl);
  }

  buscarFilhoPorID(id: number): Observable<Filho>{
    return this.http.get<Filho>(`${baseUrl}/${id}`);
  }

  buscarMaterialPorID(id: number): Observable<Material>{
    return this.http.get<Material>(`${baseUrlMaterial}/${id}`)
  }

  listarMateriaisFilhos(): Observable<Array<FilhoMaterial>>{
    return this.http.get<Array<FilhoMaterial>>(`${baseUrlFilhoMaterial}`)
  }

  salvarMaterialFilho(filhoMaterial: FilhoMaterial): Observable<FilhoMaterial> {
    return this.http.post<FilhoMaterial>(baseUrlFilhoMaterial, filhoMaterial);
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
