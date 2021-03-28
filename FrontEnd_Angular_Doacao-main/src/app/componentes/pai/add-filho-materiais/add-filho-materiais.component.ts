import { Component, Injectable, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Escola } from 'src/app/model/escola';
import { Estado } from 'src/app/model/estado';
import { Filho } from 'src/app/model/filho';
import { Material } from 'src/app/model/material';

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
  selector: 'app-add-filho-materiais',
  templateUrl: './add-filho-materiais.component.html',
  styleUrls: ['./add-filho-materiais.component.css']
})
export class AddFilhoMateriaisComponent implements OnInit {

  filho = new Filho();
  material = new Material();
  escola = new Escola();
  estado = new Estado();
estados = [
'Acre',
'Alagoas',
'Amazonas',
'Amapá',
'Bahia',
'Ceará',
'Distrito Federal',
'Espírito Santo',
'Goiás', 
'Maranhão',
'Minas Gerais',
'Mato Grosso do Sul',
'Mato Grosso',
'Pará',
'Paraíba',
'Pernambuco',
'Piauí',
'Paraná',
'Rio de Janeiro',
'Rio Grande do Norte',
'Rondônia',
'Roraima',
'Rio Grande do Sul',
'Santa Catarina',
'Sergipe',
'São Paulo',
'Tocantins'
]

  constructor() { }

  ngOnInit(): void {
  }

  novo(){
    this.filho = new Filho();
  }
}
