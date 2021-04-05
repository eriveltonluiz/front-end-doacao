import { FilhoService } from 'src/app/serviços/filho.service';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/serviços/data.service';
import { ConfirmacaoService } from 'src/app/serviços/confirmacao.service';
import { DoacaoService } from 'src/app/serviços/doacao.service';

@Component({
  selector: 'app-list-materiais-filho',
  templateUrl: './list-materiais-filho.component.html',
  styleUrls: ['./list-materiais-filho.component.css']
})
export class ListMateriaisFilhoComponent implements OnInit {

  materialFilho: FilhoMaterial = new FilhoMaterial();
  materiais = new Array<FilhoMaterial>();
  cont: number = 0;

  constructor(private router: Router,
    private dataService: DataService,
    private confirmacaoService: ConfirmacaoService,
    private filhoService: FilhoService,
    private doacaoService: DoacaoService) { }

  ngOnInit(): void {
    console.log(this.dataService.getFilho())
    if (this.dataService.getFilho() !== undefined) {

      this.doacaoService.listarMateriaisFilho(this.dataService.getFilho().nomeFilho).subscribe(retorno => {
        this.materiais = retorno
        this.materiais.forEach(m => {
          m.quantidadeDoadaVariada = 0;
        })
        this._setarMaterialFilho();
        console.log(this.materiais)
      })

    } else {
      alert('Necessário selecionar uma criança para efetuar a doação !!!');
      this.router.navigate(['listfilhosgeral']);
    }
  }

  _setarMaterialFilho() {
    let objFilho = this.dataService.getFilho();
    this.materialFilho.id.filho.id = this.materiais[0].id.filho.id;
    this.materialFilho.id.filho.nome = objFilho.nomeFilho;
    this.materialFilho.id.filho.escola.nome = objFilho.nomeEscola;
    this.materialFilho.id.filho.escola.uf = objFilho.uf;
    this.materialFilho.id.filho.escola.localidade = objFilho.localidade;
    this.materialFilho.id.filho.urlFoto = objFilho.urlFoto;
  }

  confirmarDoacao() {
    if (confirm('Deseja efetuar a doação dos materiais selecionados para ' + this.materialFilho.id.filho.nome)) {

      this.materiais.forEach(i => {
        i.quantidadeDoada = i.quantidadeDoadaVariada;
        if (i.quantidadeDoada === 0){
          this.cont++;
        }
        i.quantidadeDoadaVariada = 0;
      });

      if (this.cont === this.materiais.length) {
        alert('Necessário inserir algum valor para efetuar a transação!!')
      } else {
        this.materiais.forEach(mat => {
          mat.quantidadeDesejada -= mat.quantidadeDoada;
          mat.statusDoacao = mat.quantidadeDesejada === 0 ? 'CONFIRMADO' : 'ABERTO';
        });

        this.doacaoService.editarMaterialFilho(this.materiais).subscribe(retorno => {
          this.materiais = retorno;
          console.log(this.materiais)
          this.confirmacaoService.setFilhoMateriais(this.materiais.filter(m => m.quantidadeDoada > 0))
          this.confirmacaoService.setFilho(this.materialFilho);
          this.router.navigate(['detalhes']);
        })
      }
    }
  }

  doarTudo() {
    if (confirm('Deseja efetuar a doação de todos os materiais para ' + this.materialFilho.id.filho.nome)) {
      this.materiais.forEach(mat => {
        mat.quantidadeDoada = mat.quantidadeDesejada;
        mat.quantidadeDesejada = 0;
        mat.statusDoacao = 'CONFIRMADO'
        mat.quantidadeDoadaVariada = 0;
      })

      this.doacaoService.editarMaterialFilho(this.materiais).subscribe(retorno => {
        this.materiais = retorno;
        this.confirmacaoService.setFilhoMateriais(this.materiais.filter(m => m.quantidadeDoada > 0))
        this.confirmacaoService.setFilho(this.materialFilho);
        this.router.navigate(['detalhes']);
      })
    }
  }

  incrementa(i: number) {
    if (this.materiais[i].quantidadeDoadaVariada < this.materiais[i].quantidadeDesejada) {
      this.materiais[i].quantidadeDoadaVariada++;
    }
  }

  decrementa(i: number) {
    if (this.materiais[i].quantidadeDoadaVariada > 0) {
      this.materiais[i].quantidadeDoadaVariada--;
    }
  }
}
