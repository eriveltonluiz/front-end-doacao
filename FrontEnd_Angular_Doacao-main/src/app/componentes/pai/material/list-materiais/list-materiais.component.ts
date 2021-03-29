import { FilhoService } from 'src/app/seviços/filho.service';
import { FilhoMaterial } from './../../../../model/filho-material';
import { Component, Input, OnInit } from '@angular/core';
import { Material } from 'src/app/model/material';
import { Filho } from 'src/app/model/filho';

@Component({
  selector: 'app-list-materiais',
  templateUrl: './list-materiais.component.html',
  styleUrls: ['./list-materiais.component.css']
})
export class ListMateriaisComponent {
  materialFilho = new FilhoMaterial();
  material = new Material();
  materialPesquisa = new Material();
  @Input()
materiais: Material[] = new Array<Material>();

  @Input()
  filho: Filho = new Filho();

  materiaisFilho: Array<FilhoMaterial>;
  constructor(private filhoService: FilhoService) { }

  // ngOnInit(): void {
  //   // this.materiais = [
  //   //   {
  //   //     id: 1,
  //   //     descricao: 'apontador',
  //   //     urlFoto: '/assets/imagens/apontador.png'
  //   //   },
    
  //   //   {
  //   //     id: 2,
  //   //     descricao: 'borracha',
  //   //     urlFoto: '/assets/imagens/borracha.png'
  //   //   },
    
  //   //   {
  //   //     id: 3,
  //   //     descricao: 'Caixa de lápis',
  //   //     urlFoto: '/assets/imagens/caixa-de-lapis.png'
  //   //   },
  //   // ]
  //   //this.filhoService.listarMateriaisFilho(this.filho).subscribe(resultado => this.materiaisFilho = resultado);
  //   this.filhoService.listarMateriais().subscribe(resultado => {this.materiais = resultado;
  //     console.log(this.materiais);
    
  //   });
  // }
  
  excluirMaterial(){

  }

  editarMaterial(item: FilhoMaterial){
    this.materialFilho = item;
  }

  todos(){
    this.materiais = [
      {
        id: 1,
        descricao: 'apontador',
        urlFoto: '/assets/imagens/apontador.png'
      },
    
      {
        id: 2,
        descricao: 'borracha',
        urlFoto: '/assets/imagens/borracha.png'
      },
    
      {
        id: 3,
        descricao: 'Caixa de lápis',
        urlFoto: '/assets/imagens/caixa-de-lapis.png'
      },
    ]
  }

  pesquisarMaterial(){
    console.log(this.materialPesquisa)
    this.materiais = this.materiais.filter(m => m.id === this.materialPesquisa.id);
    console.log(this.materiais);
  }

  novo(){
    this.materialFilho = new FilhoMaterial();
  }

  salvarMaterialFilho(){
    this.filhoService.salvarMaterialFilho(this.materialFilho).subscribe(result => this.materialFilho = result);
    alert("Material salvo com sucesso");
  }

  teste(){
    console.log(this.materiais)
    console.log(this.materialFilho);
    console.log(this.material.descricao);
  }
}