import { FilhoMaterial } from './../model/filho-material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private filho: FilhoMaterial;
  constructor() { }

  setFilho(filho: FilhoMaterial){
    this.filho = filho;
  }

  getFilho(): FilhoMaterial{
    return this.filho;
  }
}
