import { Injectable } from '@angular/core';
import { FilhoMaterial } from '../model/filho-material';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoService {
  
  filho: FilhoMaterial;
  filhoMateriais: FilhoMaterial[];
  
  constructor() { }
  
  public setFilho(filho : FilhoMaterial) {
    this.filho = filho;
  }
  
  public getFilho() : FilhoMaterial {
    return this.filho;
  }

  public setFilhoMateriais(filhoMateriais : FilhoMaterial[]) {
    this.filhoMateriais = filhoMateriais;
  }
  
  public getFilhoMateriais() : FilhoMaterial[] {
    return this.filhoMateriais;
  }
}
