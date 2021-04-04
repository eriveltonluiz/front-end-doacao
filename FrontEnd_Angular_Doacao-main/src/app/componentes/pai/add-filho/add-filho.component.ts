import { DataFilhoService } from './../../../serviços/data-filho.service';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Cep } from 'src/app/model/cep';
import { Escola } from 'src/app/model/escola';
import { Filho } from 'src/app/model/filho';
import { Material } from 'src/app/model/material';
import { FilhoService } from 'src/app/serviços/filho.service';
import * as bootstrap from "bootstrap";
import { Pai } from 'src/app/model/pai';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + validarDia(date.year) : null;
  }

}

@Injectable()
export class FormatDate extends NgbDateParserFormatter {

  readonly DELIMITER = '/';



  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

function validarDia(valor) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  }
  return valor;
}
@Component({
  selector: 'app-add-filho',
  templateUrl: './add-filho.component.html',
  styleUrls: ['./add-filho.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormatDate },
  { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})
export class AddFilhoComponent implements OnInit {

  @Input()
  filho = new Filho();

  @Input()
  escola = new Escola();
  
  material: Material;
  boys: Array<string>;
  girls: Array<string>;

  constructor(private filhoService: FilhoService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dataFilhoService: DataFilhoService) { }

  ngOnInit(): void {
    if (localStorage.getItem('id') === null) {
      this.router.navigate(['']);
    }
    this.boys = [
      "/assets/boys/boy-1.png",
      "/assets/boys/boy-2.png",
      "/assets/boys/boy-4.png",
      "/assets/boys/boy-10.png",
      "/assets/boys/boy-14.png",
      "/assets/boys/boy.png",
    ];

    this.girls = [
      "/assets/girls/girl-2.png",
      "/assets/girls/girl-3.png",
      "/assets/girls/girl-7.png",
      "/assets/girls/girl-17.png",
      "/assets/girls/girl-25.png",
      "/assets/girls/girl.png",
    ];
    let filo = ''
    console.log(this.filho);
    // if (this.dataFilhoService.getFilho() !== undefined || this.dataFilhoService.getFilho() !== null) {
    //   this.filho = this.dataFilhoService.getFilho();
    //   this.escola = this.filho.escola;
    // }
  }

  fecharModal(){
    let btnFechar = document.getElementById('btnModalFechar');
    btnFechar.click();
  }

  salvar() {
    this.filho.pai = {
      id: 1,
      nome: "Marcos Sauro",
      email: "sauro@gmail.com",
      senha: "ekefsfg3r",
      celular: "86678768760",
      renda: 1000,
      cpf: "13823472143"
    }

    if (this.filho.id === null || this.filho.id === undefined) {
      console.log('Objeto escola: ' + this.escola)
      this.filhoService.salvarEscola(this.escola).subscribe(resultado => {
        this.escola = resultado;
        this.filho.escola = this.escola;

        this.filhoService.salvarFilho(this.filho).subscribe(resultado => {
          this.filho = resultado;
          console.log(this.filho)
          this.novo();
        });
        alert('Salvo com sucesso!!!');
      });
    } 
    
    else {
        this.filhoService.editarEscola(this.escola).subscribe(resultado => {
          this.escola = resultado;
        });
        this.filho.escola = this.escola;

        this.filhoService.editarFilho(this.filho).subscribe(resultado => {
          this.filho = resultado;
          //this.novo();
        });
        alert('Editado com sucesso!!!')
    }
  }

  novo() {
    this.filho = new Filho();
    this.escola = new Escola();
  }

  limpa_formulario_cep() {
    this.escola.bairro = '';
    this.escola.uf = '';
    this.escola.localidade = '';
    this.escola.numero = '';
    this.escola.logradouro = '';
  }

  consultaCep(cep: string) {
    this.limpa_formulario_cep();
    let cepObj: Cep = new Cep();
    cep = cep.replace(/\D/g, '');

    if (cep != "") {

      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.escola.logradouro = 'Carregando...';
        this.escola.bairro = 'Carregando...';
        this.escola.localidade = 'Carregando...';
        this.escola.uf = '...';
        this.escola.numero = '...';
        this.filhoService.consultaCep(cep).subscribe({
          next: dados => {
            cepObj = dados;
            //console.log(cepObj);
            if (cepObj.bairro === null || cepObj.bairro === undefined) {
              alert("CEP não encontrado."); this.limpa_formulario_cep();
              this.escola.cep = '';
            } else {
              this.escola.logradouro = cepObj.logradouro;
              this.escola.bairro = cepObj.bairro;
              this.escola.localidade = cepObj.localidade;
              this.escola.uf = cepObj.uf;
              this.escola.numero = cepObj.ddd;
              console.log(this.escola)
            }
          }
        })
      }
    }
  }

}
