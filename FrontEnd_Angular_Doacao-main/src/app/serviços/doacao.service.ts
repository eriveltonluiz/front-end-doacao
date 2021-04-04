import { FilhoMaterial } from 'src/app/model/filho-material';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrlMaterialJava = 'http://localhost:8090/doacao/';

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {

  constructor(private http: HttpClient) { }

  listarMateriaisFilhosTest(): Observable<Array<Object>>{
    return this.http.get<Array<Object>>(`${baseUrlMaterialJava}`);
  }

  listarMateriaisFilho(nome: string): Observable<Array<FilhoMaterial>>{
    return this.http.get<Array<FilhoMaterial>>(`${baseUrlMaterialJava}/${nome}`);
  }

  listarMateriaisFilhoPorID(id: number): Observable<Array<FilhoMaterial>>{
    return this.http.get<Array<FilhoMaterial>>(`${baseUrlMaterialJava}/buscar/${id}`);
  }

  editarMaterialFilho(filhoMaterial: Array<FilhoMaterial>): Observable<Array<FilhoMaterial>>{
    return this.http.put<Array<FilhoMaterial>>(`${baseUrlMaterialJava}`, filhoMaterial);
  }
}
