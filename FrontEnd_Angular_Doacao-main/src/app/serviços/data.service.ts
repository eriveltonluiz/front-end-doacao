import { ObjFilho } from './../model/obj-filho';
import { FilhoMaterial } from './../model/filho-material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private filho: ObjFilho;
  
  constructor() { }

  setFilho(filho: ObjFilho){
    this.filho = filho;
  }

  getFilho(): ObjFilho{
    return this.filho;
  }
}
