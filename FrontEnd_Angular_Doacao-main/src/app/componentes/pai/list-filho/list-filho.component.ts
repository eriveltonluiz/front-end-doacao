import { DataFilhoService } from './../../../serviços/data-filho.service';
import { Router } from '@angular/router';
import { Material } from 'src/app/model/material';
import { Component, OnInit } from '@angular/core';
import { Filho } from 'src/app/model/filho';
import { FilhoService } from 'src/app/serviços/filho.service';
import { FilhoMaterial } from 'src/app/model/filho-material';

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

  constructor(private filhoService: FilhoService, private router: Router, private dataFilhoService: DataFilhoService) { }

  ngOnInit(): void {
    //console.log(this.filhos);
    //console.log(localStorage.getItem('id'));
    if(localStorage.getItem('id') === null){
      this.router.navigate(['']);
    }
    this.filhoService.listarFilhos().subscribe(resultado => {
      this.filhos = resultado;
      console.log(this.filhos);
    });
  }

  carregarMateriais(filho: Filho){
    /* Com os dados do back-end carregar este
    this.filhoService.listarMateriaisFilho(this.filho).subscribe(resultado => this.materiaisFilho = resultado);
    */
    this.filhoService.listarMateriaisFilhos().subscribe(resultado => this.materiaisFilho = resultado);
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

  novoCarou(){
    this.materialFilho = new FilhoMaterial();
    this.filho = new Filho();
    
    let btn = document.getElementById('btnReiniciar');
    console.log(btn)
    btn.click();
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
    this.material = this.materialFilho.material;
    console.log(this.materialFilho);
  }

  editarFilho(filho: Filho){
    this.dataFilhoService.setFilho(filho);
    this.filho = filho;
    console.log(this.filho);
  }

  pesquisarMaterial(){
    console.log(this.materialPesquisa)
    this.materiais = this.materiais.filter(m => m.id === this.materialPesquisa.id);
    console.log(this.materiais);
  }

  novo(){
    this.materialFilho = new FilhoMaterial();
    this.filho = new Filho();
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
