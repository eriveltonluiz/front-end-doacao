import { FilhoMaterialDTO } from './../../../model/filho-materialDTO';
import { DoacaoService } from 'src/app/serviços/doacao.service';
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

  dto = new FilhoMaterialDTO();
  materialFilho: FilhoMaterial = new FilhoMaterial();
  materiaisFilho: FilhoMaterial[] = new Array<FilhoMaterial>();
  constructor(private router: Router,
    private confirmacaoService: ConfirmacaoService,
    private doacaoService: DoacaoService) { }

  ngOnInit(): void {
    console.log(this.confirmacaoService.getFilho());
    if(this.confirmacaoService.getFilho() !== undefined){
      this.materiaisFilho = this.confirmacaoService.getFilhoMateriais();
      
      this.materialFilho = this.materiaisFilho[0];

    } else{
      alert('Necessário selecionar uma criança e efetuar a doação para ver os detalhes !!!');
      this.router.navigate(['listfilhosgeral']);
    }
  }

  enviarEmail(){
    this.dto.cep = this.materialFilho.id.filho.escola.cep;
    this.dto.numero = this.materialFilho.id.filho.escola.numero;
    this.dto.rua = this.materialFilho.id.filho.escola.logradouro;
    this.dto.uf = this.materialFilho.id.filho.escola.uf;
    this.dto.localidade = this.materialFilho.id.filho.escola.localidade;
    this.dto.contatoPai = this.materialFilho.id.filho.pai.celular;
    this.dto.nomeFilho = this.materialFilho.id.filho.nome;
    this.dto.emailPai = this.materialFilho.id.filho.pai.email;
    this.dto.nomePai = this.materialFilho.id.filho.pai.nome;
    
    this.doacaoService.enviarEmail(this.materiaisFilho, this.dto.emailDoador).subscribe(
      p => {
        console.log(p);
        if(p === undefined || p === null)
          alert('Erro ao enviar e-mail !!!');
        else
            alert('E-mail enviado com sucesso !!!');
      }
      
    )
  }

}
