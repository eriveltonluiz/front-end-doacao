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
    return this.http.get<Array<Filho>>(baseUrlJava);
  }

  buscarFilhoPorID(id: number): Observable<Filho>{
    return this.http.get<Filho>(`${baseUrlJava}${id}`);
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

}
