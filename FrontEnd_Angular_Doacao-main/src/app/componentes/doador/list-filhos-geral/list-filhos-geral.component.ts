import { FiltroPesquisa } from './../../../model/filtro-pesquisa';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { Component, OnInit } from '@angular/core';
import { FilhoService } from 'src/app/seviços/filho.service';
import { Material } from 'src/app/model/material';
import { Estado } from 'src/app/model/estado';

@Component({
  selector: 'app-list-filhos-geral',
  templateUrl: './list-filhos-geral.component.html',
  styleUrls: ['./list-filhos-geral.component.css']
})
export class ListFilhosGeralComponent implements OnInit {

  filtroPesquisa = new FiltroPesquisa();
  materiaisFilho: FilhoMaterial[] = new Array<FilhoMaterial>();
  materiais: Material[];
  estados: Estado[] = new Array<Estado>();
  constructor(private filhoService: FilhoService) { }

  ngOnInit(): void {
    this.filhoService.listarMateriaisFilhos().subscribe(result => {
      this.materiaisFilho = result;
    });
    this.filhoService.listarMateriais().subscribe(res => this.materiais = res);
    this.filhoService.listarEstados().subscribe(res => this.estados = res);
  }

  print(){
    console.log(this.filtroPesquisa);
  }

}
