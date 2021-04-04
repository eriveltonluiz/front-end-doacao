import { DoacaoService } from 'src/app/serviços/doacao.service';
import { FilhoService } from 'src/app/serviços/filho.service';
import { FilhoMaterial } from 'src/app/model/filho-material';
import { ConfirmacaoService } from './../../../serviços/confirmacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doacao-confirmada',
  templateUrl: './doacao-confirmada.component.html',
  styleUrls: ['./doacao-confirmada.component.css']
})
export class DoacaoConfirmadaComponent implements OnInit {

  materialFilho: FilhoMaterial = new FilhoMaterial();
  materiaisFilho: FilhoMaterial[] = new Array<FilhoMaterial>();
  constructor(private router: Router,
    private confirmacaoService: ConfirmacaoService,
    private filhoService: FilhoService,
    private doacaoService: DoacaoService) { }

  ngOnInit(): void {
    console.log(this.confirmacaoService.getFilho());
    if(this.confirmacaoService.getFilho() !== undefined){
      // let primeiroNome = this.materialFilho.filho.nome.split(' ');
      // console.log(primeiroNome);
      // this.materialFilho.filho.nome = primeiroNome[0];
      this.materiaisFilho = this.confirmacaoService.getFilhoMateriais();
      
      this.materialFilho = this.materiaisFilho[0];

    } else{
      alert('Necessário selecionar uma criança e efetuar a doação para ver os detalhes !!!');
      this.router.navigate(['listfilhosgeral']);
    }
  }

}
