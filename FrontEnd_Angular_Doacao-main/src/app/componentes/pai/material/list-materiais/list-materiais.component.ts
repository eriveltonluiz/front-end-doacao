import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/model/material';

@Component({
  selector: 'app-list-materiais',
  templateUrl: './list-materiais.component.html',
  styleUrls: ['./list-materiais.component.css']
})
export class ListMateriaisComponent implements OnInit {
materiais: Array<Material> = [
  {
    id: 1,
    descricao: 'apontador',
    quantidadeDesejada: 2,
    urlFoto: '/assets/imagens/apontador.png'
  },

  {
    id: 2,
    descricao: 'borracha',
    quantidadeDesejada: 4,
    urlFoto: '/assets/imagens/borracha.png'
  },

  {
    id: 1,
    descricao: 'Caixa de lápis',
    quantidadeDesejada: 2,
    urlFoto: '/assets/imagens/caixa-de-lapis.png'
  },
]
  constructor() { }

  ngOnInit(): void {
  }
  
  excluirMaterial(){

  }

  editarMaterial(){
    
  }
}
