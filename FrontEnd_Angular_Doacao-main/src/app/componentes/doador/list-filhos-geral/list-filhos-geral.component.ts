import { DataService } from './../../../serviços/data.service';
import { FiltroPesquisa } from './../../../model/filtro-pesquisa';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { Component, OnInit } from '@angular/core';
import { FilhoService } from 'src/app/serviços/filho.service';
import { Material } from 'src/app/model/material';
import { Router } from '@angular/router';
import { ObjFilho } from 'src/app/model/obj-filho';

@Component({
  selector: 'app-list-filhos-geral',
  templateUrl: './list-filhos-geral.component.html',
  styleUrls: ['./list-filhos-geral.component.css']
})
export class ListFilhosGeralComponent implements OnInit {

  objFilho = new ObjFilho();
  objFilhos: ObjFilho[];
  materialFilho = new FilhoMaterial();
  filtroPesquisa = new FiltroPesquisa();
  materiaisFilho: FilhoMaterial[] = new Array<FilhoMaterial>();
  materiais: Material[];
  constructor(private filhoService: FilhoService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.filhoService.listarMateriaisFilhosTest().subscribe(r => {
      let array = Array<Object>();

      let objFilho = [];
      
      array = r;
      array.forEach(arr => {
        let s: string = arr.toString()
        let sa = new Array<string>();
        sa = s.split(',');
        
        for(let i = 0; i< sa.length; i++){
          switch (i) {
            case 0:
              this.objFilho.nomeFilho = sa[0]
              break;
            
              case 1:
                this.objFilho.uf = sa[1]
              break;
              case 2:
                this.objFilho.localidade = sa[2]
              break;
              case 3:
                this.objFilho.nomeEscola = sa[3]
              break;
              case 4:
                this.objFilho.urlFoto = sa[4]
              break;
          }
        }
        console.log(this.objFilho)
        objFilho.push(this.objFilho)
        this.objFilho = new ObjFilho();
       
      })
      console.log(objFilho);
      this.objFilhos = objFilho;

    })
    this.filhoService.listarMateriaisFilhos().subscribe(result => {
      this.materiaisFilho = result;
      console.log(this.materiaisFilho)
    });
    this.filhoService.listarMateriais().subscribe(res => this.materiais = res);
  }

  setarMateriaisFilho(objFilho: ObjFilho){
    this.objFilho = objFilho;
    this.dataService.setFilho(objFilho);
    this.router.navigate(['/doacao'])
  }

  print(){
    console.log(this.filtroPesquisa);
  }

}
