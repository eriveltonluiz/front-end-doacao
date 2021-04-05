import { Component, OnInit } from '@angular/core';
import { Pai } from 'src/app/model/pai';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  pai = new Pai();

  constructor() { }

  ngOnInit(): void {
  }

  cadastrar(){
    
  }

}
