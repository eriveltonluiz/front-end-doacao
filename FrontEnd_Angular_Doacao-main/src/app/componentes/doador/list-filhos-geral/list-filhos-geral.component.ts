import { DataService } from './../../../serviços/data.service';
import { FiltroPesquisa } from './../../../model/filtro-pesquisa';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { Component, OnInit } from '@angular/core';
import { FilhoService } from 'src/app/serviços/filho.service';
import { Material } from 'src/app/model/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-filhos-geral',
  templateUrl: './list-filhos-geral.component.html',
  styleUrls: ['./list-filhos-geral.component.css']
})
export class ListFilhosGeralComponent implements OnInit {

  materialFilho = new FilhoMaterial();
  filtroPesquisa = new FiltroPesquisa();
  materiaisFilho: FilhoMaterial[] = new Array<FilhoMaterial>();
  materiais: Material[];
  constructor(private filhoService: FilhoService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.filhoService.listarMateriaisFilhos().subscribe(result => {
      this.materiaisFilho = result;
    });
    this.filhoService.listarMateriais().subscribe(res => this.materiais = res);
  }

  setarMateriaisFilho(materialFilho: FilhoMaterial){
    this.materialFilho = materialFilho;
    this.dataService.setFilho(materialFilho);
    this.router.navigate(['/doacao'])
  }

  print(){
    console.log(this.filtroPesquisa);
  }

}
