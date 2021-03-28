import { Component, OnInit } from '@angular/core';
import { Filho } from 'src/app/model/filho';

@Component({
  selector: 'app-list-filho',
  templateUrl: './list-filho.component.html',
  styleUrls: ['./list-filho.component.css']
})
export class ListFilhoComponent implements OnInit {

  filhos: Array<Filho> = [
    {
      id: 1,
      nome: 'Marcos',
      relato: 'Nesse momento passo dificuldades com mateirais, principalmente com agramvamento da pandemia',
      dataNascimento: new Date(),
      cpf: '13123432543',
    },

    {
      id: 2,
      nome: 'Luana',
      relato: 'Nesse momento passo dificuldades com mateirais, principalmente com agramvamento da pandemia',
      dataNascimento: new Date(),
      cpf: '43723931583',
    },

    {
      id: 3,
      nome: 'Everaldo',
      relato: 'Nesse momento passo dificuldades com mateirais, principalmente com agramvamento da pandemia',
      dataNascimento: new Date(),
      cpf: '73193432543',
    },

    {
      id: 3,
      nome: 'Everaldo',
      relato: 'Nesse momento passo dificuldades com mateirais, principalmente com agramvamento da pandemia',
      dataNascimento: new Date(),
      cpf: '73193432543',
    }
  ]

  constructor() { }

  ngOnInit(): void {
    console.log(this.filhos);
  }

}
