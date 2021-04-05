import { DoacaoService } from 'src/app/serviços/doacao.service';
import { DataService } from './../../../serviços/data.service';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { Component, OnInit } from '@angular/core';
import { FilhoService } from 'src/app/serviços/filho.service';
import { Material } from 'src/app/model/material';
import { Router } from '@angular/router';
import { ObjFilho } from 'src/app/model/obj-filho';
import { FiltroPesquisa } from 'src/app/model/filtro-pesquisa';

@Component({
  selector: 'app-list-filhos-geral',
  templateUrl: './list-filhos-geral.component.html',
  styleUrls: ['./list-filhos-geral.component.css']
})
export class ListFilhosGeralComponent implements OnInit {

  objFilho = new ObjFilho();
  objFilhosGeral: ObjFilho[];
  objFilhos: ObjFilho[];
  materialFilho = new FilhoMaterial();
  filtroPesquisa = new FiltroPesquisa();
  materiaisFilho: FilhoMaterial[] = new Array<FilhoMaterial>();
  materiais: Material[];
  municipios: string[] = [];
  escolas: string[] = [];

  constructor(private filhoService: FilhoService, private router: Router, private dataService: DataService,
    private doacaoService: DoacaoService) { }

  ngOnInit(): void {
    console.log(this.filtroPesquisa.municipio)
    this.doacaoService.listarMateriaisFilhosTest().subscribe(r => {
      let array = Array<Object>();

      let objFilho = [];

      array = r;
      array.forEach(arr => {
        let s: string = arr.toString()
        let sa = new Array<string>();
        sa = s.split(',');

        for (let i = 0; i < sa.length; i++) {
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
        objFilho.push(this.objFilho)
        this.objFilho = new ObjFilho();

      })
      this.objFilhos = objFilho;
      this.objFilhosGeral = [...this.objFilhos];

      this.doacaoService.listarMateriais().subscribe(result => {
        this.materiais = result;

        this.objFilhos.forEach(obj => {
          this.municipios.push(obj.localidade);
          this.escolas.push(obj.nomeEscola);
        })
        this.municipios = this.municipios.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        })
        this.escolas = this.escolas.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        })
      });
    })
  }

  setarMateriaisFilho(objFilho: ObjFilho) {
    this.objFilho = objFilho;
    this.dataService.setFilho(objFilho);
    this.router.navigate(['/doacao'])
  }

  print() {
    console.log(this.filtroPesquisa.municipio)
    console.log(this.filtroPesquisa.material)
    console.log(this.filtroPesquisa.escola)

    if (this.filtroPesquisa.municipio !== undefined && this.filtroPesquisa.escola !== undefined && this.filtroPesquisa.material !== undefined) {
      this.doacaoService.listarFilhosPorFiiltro(this.filtroPesquisa.material).subscribe(r => {

        let array = Array<Object>();

        let objFilho = [];

        array = r;
        array.forEach(arr => {
          let s: string = arr.toString()
          let sa = new Array<string>();
          sa = s.split(',');

          for (let i = 0; i < sa.length; i++) {
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
          objFilho.push(this.objFilho)
          this.objFilho = new ObjFilho();

        })
        this.objFilhos = objFilho;
        this.objFilhos = this.objFilhos.filter(obj => obj.nomeEscola === this.filtroPesquisa.escola).filter(obj => obj.localidade == this.filtroPesquisa.municipio)
      })
    }

    if (this.filtroPesquisa.municipio !== undefined && this.filtroPesquisa.escola !== undefined && this.filtroPesquisa.material === undefined) {
      let obs = [...this.objFilhosGeral]
      this.objFilhos = obs.filter(obj => obj.localidade == this.filtroPesquisa.municipio).filter(obj => obj.nomeEscola == this.filtroPesquisa.escola)
    }

    else if (this.filtroPesquisa.municipio !== undefined && this.filtroPesquisa.material === undefined && this.filtroPesquisa.escola === undefined) {
      let obs = [...this.objFilhosGeral]
      this.objFilhos = obs.filter(obj => obj.localidade == this.filtroPesquisa.municipio);
    }

    else if (this.filtroPesquisa.escola !== undefined && this.filtroPesquisa.municipio === undefined && this.filtroPesquisa.material === undefined) {
      let obs = [...this.objFilhosGeral]
      this.objFilhos = obs.filter(obj => obj.nomeEscola == this.filtroPesquisa.escola)
    }

    else if (this.filtroPesquisa.material !== undefined && this.filtroPesquisa.escola == undefined && this.filtroPesquisa.municipio == undefined) {
      this.doacaoService.listarFilhosPorFiiltro(this.filtroPesquisa.material).subscribe(r => {

        let array = Array<Object>();

        let objFilho = [];

        array = r;
        array.forEach(arr => {
          let s: string = arr.toString()
          let sa = new Array<string>();
          sa = s.split(',');

          for (let i = 0; i < sa.length; i++) {
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
          objFilho.push(this.objFilho)
          this.objFilho = new ObjFilho();

        })
        this.objFilhos = objFilho;

      })
    }

    else if (this.filtroPesquisa.municipio !== undefined && this.filtroPesquisa.material !== undefined && this.filtroPesquisa.escola === undefined) {

      this.doacaoService.listarFilhosPorFiiltro(this.filtroPesquisa.material).subscribe(r => {

        let array = Array<Object>();

        let objFilho = [];

        array = r;
        array.forEach(arr => {
          let s: string = arr.toString()
          let sa = new Array<string>();
          sa = s.split(',');

          for (let i = 0; i < sa.length; i++) {
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
          objFilho.push(this.objFilho)
          this.objFilho = new ObjFilho();

        })
        this.objFilhos = objFilho;
        this.objFilhos.filter(obj => obj.localidade === this.filtroPesquisa.municipio)
      })

    }

    else if (this.filtroPesquisa.material != undefined && this.filtroPesquisa.escola !== undefined && this.filtroPesquisa.municipio === undefined) {
      this.doacaoService.listarFilhosPorFiiltro(this.filtroPesquisa.material).subscribe(r => {

        let array = Array<Object>();

        let objFilho = [];

        array = r;
        array.forEach(arr => {
          let s: string = arr.toString()
          let sa = new Array<string>();
          sa = s.split(',');

          for (let i = 0; i < sa.length; i++) {
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
          objFilho.push(this.objFilho)
          this.objFilho = new ObjFilho();

        })
        this.objFilhos = objFilho;
        this.objFilhos = this.objFilhos.filter(obj => obj.nomeEscola === this.filtroPesquisa.escola)
      })
    }
  }

}
