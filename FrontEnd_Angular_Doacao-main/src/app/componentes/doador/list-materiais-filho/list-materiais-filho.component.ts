import { FilhoMaterial } from 'src/app/model/filho-material';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/serviços/data.service';
import { ConfirmacaoService } from 'src/app/serviços/confirmacao.service';

@Component({
  selector: 'app-list-materiais-filho',
  templateUrl: './list-materiais-filho.component.html',
  styleUrls: ['./list-materiais-filho.component.css']
})
export class ListMateriaisFilhoComponent implements OnInit {

  materialFilho: FilhoMaterial = new FilhoMaterial();

  constructor(private router: Router,
    private dataService: DataService,
    private confirmacaoService: ConfirmacaoService) { }

  ngOnInit(): void {
    // console.log(this.dataService.getFilho())
    if (this.dataService.getFilho() !== undefined) {
      this.materialFilho = this.dataService.getFilho();
      console.log(this.materialFilho);
    } else {
      alert('Necessário selecionar uma criança para efetuar a doação !!!');
      this.router.navigate(['listfilhosgeral']);
    }
  }

  confirmarDoacao(filho: FilhoMaterial) {
    this.confirmacaoService.setFilho(filho);
    this.router.navigate(['detalhes']);
  }

}
