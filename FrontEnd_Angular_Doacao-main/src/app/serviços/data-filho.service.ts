import { Injectable } from '@angular/core';
import { Filho } from '../model/filho';

@Injectable({
  providedIn: 'root'
})
export class DataFilhoService {
  private filho: Filho;
  constructor() { }

  setFilho(filho: Filho){
    this.filho = filho;
  }

  getFilho(): Filho{
    return this.filho;
  }
}
