import { FormatDate } from './../add-filho/add-filho.component';
import { Material } from 'src/app/model/material';
import { Component, OnInit } from '@angular/core';
import { Filho } from 'src/app/model/filho';
import { FilhoService } from 'src/app/serviços/filho.service';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-list-filho',
  templateUrl: './list-filho.component.html',
  styleUrls: ['./list-filho.component.css']
})
export class ListFilhoComponent implements OnInit {

  materialFilho = new FilhoMaterial();
  material = new Material();
  materialPesquisa = new Material();
  filho: Filho = new Filho();
  materiais: Material[] = new Array<Material>();
  filhos: Array<Filho> = [];
  materiaisFilho: FilhoMaterial[] = new Array<FilhoMaterial>();
  // filhos: Array<Filho> = [
  //   {
  //     id: 1,
  //     nome: 'Marcos',
  //     relato: 'Nesse momento passo dificuldades com mateirais, principalmente com agramvamento da pandemia',
  //     dataNascimento: new Date(),
  //     cpf: '13123432543',
  //   },

  //   {
  //     id: 2,
  //     nome: 'Luana',
  //     relato: 'Nesse momento passo dificuldades com mateirais, principalmente com agramvamento da pandemia',
  //     dataNascimento: new Date(),
  //     cpf: '43723931583',
  //   },

  //   {
  //     id: 3,
  //     nome: 'Everaldo',
  //     relato: 'Nesse momento passo dificuldades com mateirais, principalmente com agramvamento da pandemia',
  //     dataNascimento: new Date(),
  //     cpf: '73193432543',
  //   },

  //   {
  //     id: 3,
  //     nome: 'Everaldo',
  //     relato: 'Nesse momento passo dificuldades com mateirais, principalmente com agramvamento da pandemia',
  //     dataNascimento: new Date(),
  //     cpf: '73193432543',
  //   }
  // ]

  constructor(private filhoService: FilhoService) { }

  ngOnInit(): void {
    //console.log(this.filhos);
    console.log(localStorage.getItem('id'));
    this.filhoService.listarFilhos().subscribe(resultado => {
      this.filhos = resultado;
      this.filhos.forEach(filho => {
        console.log(typeof filho.dataNascimento)
        
      })
      console.log(this.filhos);
    });
  }

  carregarMateriais(filho: Filho){
    this.filhoService.listarMateriaisFilho(this.filho).subscribe(resultado => this.materiaisFilho = resultado);
    this.filhoService.listarMateriais().subscribe(resultado => this.materiais = resultado);
    this.filho = filho;
    let data = new Date();
    // let aux = {
    //   "year": 2007,
    //   "month": 12,
    //   "day": 13
    // }
    console.log(typeof filho.dataNascimento)
    console.log(data.getDate().valueOf())
    console.log(data.getDate())
    console.log(data)
    console.log(data.getTime())
    console.log(data.getTime().valueOf())
    console.log(data.toTimeString())
    console.log(data.toString())
    //console.log(new Date(JSON.stringify(aux.day) + '-' + JSON.stringify(aux.month) + '-' + JSON.stringify(aux.year)))
    console.log(new Date(data.getDate(),data.getMonth() ,data.getDate()))
  }

  excluir(filho: Filho, indice: number){
    if(confirm('Deseja excluir do sistema seu filho?')){
      this.filhoService.excluirFilho(filho.id).subscribe();
      this.filhos.splice(indice, 1);
    }
  }

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
    this.filhoService.buscarMaterialPorID(this.material.id).subscribe(result => { 
      this.material = result; 
      this.materialFilho.material = this.material;
      this.materialFilho.filho = this.filho;
      this.materialFilho.quantidadeDoada = 0;
      this.materialFilho.statusDoacao = "Em aberto";
      console.log(this.materialFilho);
      this.filhoService.salvarMaterialFilho(this.materialFilho).subscribe(result => {this.materialFilho = result;alert("Material salvo com sucesso");});
      

      error:{
        alert("Erro ao salvar");
      }
    });
    
  }

  teste(){
    console.log(this.materiais)
    console.log(this.materialFilho);
    console.log(this.material.descricao);
  }
}
