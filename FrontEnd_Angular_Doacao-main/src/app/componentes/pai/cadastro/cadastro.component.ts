import { Router } from '@angular/router';
import { LoginService } from 'src/app/serviços/login.service';
import { Component, OnInit } from '@angular/core';
import { Pai } from 'src/app/model/pai';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  pai = new Pai();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  cadastrar(){
    this.loginService.salvarPai(this.pai).subscribe({
      next: p => {
        alert('Cadastro realizado com sucesso');
        localStorage.clear();
        this.router.navigate(['listfilho']);
      },
      error: err =>
        alert("Erro ao se cadastrar informações não podem ser repetidas")
    })
  }

}
