import { DataFilhoService } from './../../../serviços/data-filho.service';
import { Router } from '@angular/router';
import { Material } from 'src/app/model/material';
import { Component, OnInit } from '@angular/core';
import { Filho } from 'src/app/model/filho';
import { FilhoService } from 'src/app/serviços/filho.service';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { LoginService } from 'src/app/serviços/login.service';
import { Pai } from 'src/app/model/pai';

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
  pai = new Pai();

  constructor(private filhoService: FilhoService,
    private router: Router,
    private loginService: LoginService,
    private dataFilhoService: DataFilhoService) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('id') === null){
      this.router.navigate(['']);
    }
    
    this.loginService.retornarPai(+localStorage.getItem('id')).subscribe(retorno => {
      this.pai = retorno
      this.filhoService.buscarFilhosPorID(this.pai.id).subscribe(resultado => {
        this.filhos = resultado;
        console.log(this.filhos);
      });
    
    })
    
  }

  carregarMateriais(filho: Filho){
    /* Com os dados do back-end carregar este
    this.filhoService.listarMateriaisFilho(this.filho).subscribe(resultado => this.materiaisFilho = resultado);
    */
    this.filhoService.listarMateriaisFilhos().subscribe(resultado => this.materiaisFilho = resultado);
    this.filhoService.listarMateriais().subscribe(resultado => this.materiais = resultado);
    this.filho = filho;
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
    this.material = this.materialFilho.id.material;
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
      this.materialFilho.id.material = this.material;
      this.materialFilho.id.filho = this.filho;
      this.materialFilho.quantidadeDoada = 0;
      this.materialFilho.statusDoacao = "Em aberto";
      console.log(this.materialFilho);
      this.filhoService.salvarMaterialFilho(this.materialFilho).subscribe(result => {this.materialFilho = result;alert("Material salvo com sucesso");});
    });
    
  }

}
