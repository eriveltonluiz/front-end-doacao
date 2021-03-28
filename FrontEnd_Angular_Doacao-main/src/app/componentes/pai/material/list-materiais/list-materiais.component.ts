import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/model/material';

@Component({
  selector: 'app-list-materiais',
  templateUrl: './list-materiais.component.html',
  styleUrls: ['./list-materiais.component.css']
})
export class ListMateriaisComponent implements OnInit {
  material = new Material();
  materialPesquisa = new Material();
materiais: Array<Material>;
  constructor() { }

  ngOnInit(): void {
    this.materiais = [
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
        id: 3,
        descricao: 'Caixa de lápis',
        quantidadeDesejada: 2,
        urlFoto: '/assets/imagens/caixa-de-lapis.png'
      },
    ]
  }
  
  excluirMaterial(){

  }

  editarMaterial(item: Material){
    this.material = item;
  }

  todos(){
    this.materiais = [
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
        id: 3,
        descricao: 'Caixa de lápis',
        quantidadeDesejada: 2,
        urlFoto: '/assets/imagens/caixa-de-lapis.png'
      },
    ]
  }

  pesquisarMaterial(){
    console.log(this.materialPesquisa)
    this.materiais = this.materiais.filter(m => m.id === this.materialPesquisa.id);
    console.log(this.materiais);
  }
}
