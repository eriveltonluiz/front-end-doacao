import { FilhoService } from 'src/app/serviços/filho.service';
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
  materiais = new Array<FilhoMaterial>();


  constructor(private router: Router,
    private dataService: DataService,
    private confirmacaoService: ConfirmacaoService,
    private filhoService: FilhoService) { }

  ngOnInit(): void {
     console.log(this.dataService.getFilho())
    if (this.dataService.getFilho() !== undefined) {
      
      this.filhoService.listarMateriaisFilho(this.dataService.getFilho().nomeFilho).subscribe(retorno => {
        this.materiais = retorno
        this._setarMaterialFilho();
        console.log(this.materiais)
      })

    } else {
      alert('Necessário selecionar uma criança para efetuar a doação !!!');
      this.router.navigate(['listfilhosgeral']);
    }
  }

  _setarMaterialFilho(){
    let objFilho = this.dataService.getFilho();
      this.materialFilho.id.filho.nome = objFilho.nomeFilho;
      this.materialFilho.id.filho.escola.nome = objFilho.nomeEscola;
      this.materialFilho.id.filho.escola.uf = objFilho.uf;
      this.materialFilho.id.filho.escola.localidade = objFilho.localidade;
      this.materialFilho.id.filho.urlFoto = objFilho.urlFoto;
      console.log(this.materialFilho);
  }

  confirmarDoacao(filho: FilhoMaterial) {
    this.confirmacaoService.setFilho(filho);
    this.router.navigate(['detalhes']);
  }

}
