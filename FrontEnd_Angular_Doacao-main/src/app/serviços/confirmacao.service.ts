import { Injectable } from '@angular/core';
import { FilhoMaterial } from '../model/filho-material';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoService {
  
  filho: FilhoMaterial;
  
  constructor() { }
  
  public setFilho(filho : FilhoMaterial) {
    this.filho = filho;
  }
  
  public getFilho() : FilhoMaterial {
    return this.filho;
  }
}
