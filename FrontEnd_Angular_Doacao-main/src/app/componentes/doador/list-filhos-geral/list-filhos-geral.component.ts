import { FilhoMaterial } from 'src/app/model/filho-material';
import { Component, OnInit } from '@angular/core';
import { FilhoService } from 'src/app/seviços/filho.service';
import { Material } from 'src/app/model/material';

@Component({
  selector: 'app-list-filhos-geral',
  templateUrl: './list-filhos-geral.component.html',
  styleUrls: ['./list-filhos-geral.component.css']
})
export class ListFilhosGeralComponent implements OnInit {

  materiaisFilho: FilhoMaterial[] = new Array<FilhoMaterial>();
materiais: Material[];
  constructor(private filhoService: FilhoService) { }

  ngOnInit(): void {
    this.filhoService.listarMateriaisFilhos().subscribe(result => {this.materiaisFilho = result;
      console.log(this.materiaisFilho)
    }
    );
    this.filhoService.listarMateriais().subscribe(res => this.materiais = res);
  }

}
