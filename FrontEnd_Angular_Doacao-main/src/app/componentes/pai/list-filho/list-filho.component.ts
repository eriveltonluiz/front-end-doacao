import { DoacaoService } from 'src/app/serviços/doacao.service';
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
  indice: number;

  constructor(private filhoService: FilhoService,
    private router: Router,
    private loginService: LoginService,
    private dataFilhoService: DataFilhoService,
    private doacaoService: DoacaoService) { }

  ngOnInit(): void {

    if (localStorage.getItem('id') === null) {
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

  carregarMateriais(filho: Filho) {
    /* Com os dados do back-end carregar este
    this.filhoService.listarMateriaisFilho(this.filho).subscribe(resultado => this.materiaisFilho = resultado);
    */
    this.doacaoService.listarMateriaisFilhoPorID(filho.id).subscribe(resultado => {
      this.materiaisFilho = resultado
      console.log(this.materiaisFilho);
      this.doacaoService.listarMateriais().subscribe(resultado => this.materiais = resultado);
    });
    this.filho = filho;
  }

  novoCarou() {
    this.materialFilho = new FilhoMaterial();
    this.filho = new Filho();

    let btn = document.getElementById('btnReiniciar');
    console.log(btn)
    btn.click();
  }

  excluir(filho: Filho, indice: number) {
    if (confirm('Deseja excluir do sistema seu filho?')) {
      this.filhoService.excluirFilho(filho.id).subscribe();
      this.filhos.splice(indice, 1);
      alert("Excluído com sucesso!!!");
    }
  }

  excluirMaterial(material: FilhoMaterial, indice: number) {
    if (confirm('Deseja excluir?'))
      this.doacaoService.remover(material).subscribe(retorno => {
        this.materiaisFilho.splice(indice, 1);
        alert('Material removido com sucesso!!');
      })
  }

  editarMaterial(item: FilhoMaterial, indice: number) {
    this.materialFilho = item;
    this.material = this.materialFilho.id.material;
    this.indice = indice;
    console.log(this.materialFilho);
  }

  editarFilho(filho: Filho) {
    this.dataFilhoService.setFilho(filho);
    this.filho = filho;
    console.log(this.filho);
  }

  novo() {
    this.materialFilho = new FilhoMaterial();
    this.filho = new Filho();
    this.material = new Material();
  }

  salvarMaterialFilho() {
    console.log(this.materialFilho[this.indice])
    console.log(this.material);
    let verificar = false;
    let verificarEdit = false;

    console.log(this.indice)

    if (this.materialFilho.quantidadeDoada === 0) {
      this.materiaisFilho.forEach(m => {
        console.log(m.id.material.id === this.material.id && this.materiaisFilho[this.indice].id.material.id !== this.material.id);
        console.log(m.id.material.id === this.material.id);
        console.log(this.materiaisFilho[this.indice].id.material.id + ' ', this.material.id + ' ',this.materiaisFilho[this.indice].id.material.id !== this.material.id);
        if (m.id.material.id === this.material.id && this.materiaisFilho[this.indice].id.material.descricao !== this.material.descricao) {
          verificarEdit = true;
        }
      })
      if (!verificarEdit) {
        this.doacaoService.buscarMaterialPorID(this.material.id).subscribe(result => {
          this.material = result;
          this.materialFilho.id.material = this.material;
          this.doacaoService.editarMaterialUnicoFilho(this.materialFilho).subscribe(result => { this.materialFilho = result; alert("Material editado com sucesso"); });
        });
      } else {
        alert('Mateial já inserido na sua lista!!!');
        this.materialFilho = new FilhoMaterial();
        this.material = new Material();
      } 
    } else {

      this.materiaisFilho.forEach(m => {
        if (m.id.material.id === this.material.id) {
          verificar = true;
        }
      })

      if (!verificar) {
        this.doacaoService.buscarMaterialPorID(this.material.id).subscribe(result => {
          this.material = result;
          this.materialFilho.id.material = this.material;
          this.materialFilho.id.filho = this.filho;
          this.materialFilho.quantidadeDoada = 0;
          this.materialFilho.statusDoacao = "ABERTO";
          console.log(this.materialFilho);
          this.doacaoService.salvarMaterialFilho(this.materialFilho).subscribe(result => { this.materialFilho = result; this.materiaisFilho.push(this.materialFilho); alert("Material salvo com sucesso"); });
        });
      } else {
        alert('Mateial já inserido na sua lista!!!');
        this.materialFilho = new FilhoMaterial();
        this.material = new Material();
      }
    }
  }
}
