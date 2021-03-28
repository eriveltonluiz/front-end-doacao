import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Escola } from 'src/app/model/escola';
import { Estado } from 'src/app/model/estado';
import { Filho } from 'src/app/model/filho';
import { Material } from 'src/app/model/material';
import { Pai } from 'src/app/model/pai';
import { FilhoService } from 'src/app/seviços/filho.service';

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
  styleUrls: ['./add-filho.component.css']
})
export class AddFilhoComponent implements OnInit {

  filho = new Filho();
  material = new Material();
  escola = new Escola();
  estado = new Estado();
  estados: Array<Estado>
  // estados = [
  // 'Acre',
  // 'Alagoas',
  // 'Amazonas',
  // 'Amapá',
  // 'Bahia',
  // 'Ceará',
  // 'Distrito Federal',
  // 'Espírito Santo',
  // 'Goiás', 
  // 'Maranhão',
  // 'Minas Gerais',
  // 'Mato Grosso do Sul',
  // 'Mato Grosso',
  // 'Pará',
  // 'Paraíba',
  // 'Pernambuco',
  // 'Piauí',
  // 'Paraná',
  // 'Rio de Janeiro',
  // 'Rio Grande do Norte',
  // 'Rondônia',
  // 'Roraima',
  // 'Rio Grande do Sul',
  // 'Santa Catarina',
  // 'Sergipe',
  // 'São Paulo',
  // 'Tocantins'
  // ]

  constructor(private filhoService: FilhoService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.filhoService.listarEstados().subscribe(resultado => this.estados = resultado)
    let id = this.activeRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.filhoService.buscarFilhoPorID(+id).subscribe(resultado => {
        this.filho = resultado;
        this.escola = this.filho.escola;
        this.estado = this.escola.estado;
      });
      console.log(this.filho.escola);
      console.log(this.filho);
    }
  }

  salvar() {

    this.filho.pai = {
      id: 1,
      nome: "Marcos Sauro",
      email: "sauro@gmail.com",
      senha: "ekefsfg3r",
      celular: "86678768760",
      renda: 1000,
      cpf: "13823472143",
      profissao: "Servente de pedreiro"
    }

    console.log(this.estado.nome);
    console.log(this.escola);
    console.log(this.filho);

    if (this.estado.nome !== null) {
      this.escola.estado = this.estado;
      if (this.filho.id === null || this.filho.id === undefined) {
        this.filhoService.salvarEscola(this.escola).subscribe(resultado => this.escola = resultado);
        this.filho.escola = this.escola;
        this.filhoService.salvarFilho(this.filho).subscribe(resultado => this.filho = resultado);
        console.log(this.filho);
        alert('Salvo com sucesso!!!');
        this.novo();
      } else {
        this.filhoService.editarEscola(this.escola).subscribe(resultado => this.escola = resultado);
        this.filho.escola = this.escola;
        this.filhoService.editarFilho(this.filho).subscribe(resultado => this.filho = resultado);
        console.log(this.filho);
        alert('Editado com sucesso!!!')
      }
    }
  }

  novo() {
    this.filho = new Filho();
    this.escola = new Escola();
    this.estado = new Estado();
  }
}
