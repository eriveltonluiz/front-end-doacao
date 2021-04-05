import { FiltroPesquisa } from './../model/filtro-pesquisa';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../model/material';

const baseUrlMaterialJava = 'http://localhost:8090/doacao/';

@Injectable({
  providedIn: 'root'
})
export class DoacaoService {

  constructor(private http: HttpClient) { }

  buscarMaterialPorID(id: number): Observable<Material>{
    return this.http.get<Material>(`${baseUrlMaterialJava}material/${id}`)
  }

  listarMateriais(): Observable<Material[]> {
    return this.http.get<Material[]>(baseUrlMaterialJava + 'material');
  }

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

  editarMaterialUnicoFilho(filhoMaterial: FilhoMaterial): Observable<FilhoMaterial>{
    return this.http.put<FilhoMaterial>(`${baseUrlMaterialJava}registrounico`, filhoMaterial);
  }

  remover(filhoMaterial: FilhoMaterial): Observable<FilhoMaterial> {
    return this.http.delete<FilhoMaterial>(baseUrlMaterialJava + filhoMaterial.id.filho.id + '/' + filhoMaterial.id.material.id);
  }

  salvarMaterialFilho(filhoMaterial: FilhoMaterial): Observable<FilhoMaterial> {
    return this.http.post<FilhoMaterial>(baseUrlMaterialJava, filhoMaterial);
  }

  listarFilhosPorFiiltro(id: number): Observable<Array<Object>>{
    return this.http.get<Array<Object>>(baseUrlMaterialJava + 'filtros/' + id)
  }
}
