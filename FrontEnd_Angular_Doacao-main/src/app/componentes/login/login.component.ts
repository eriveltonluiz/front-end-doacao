import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pai } from 'src/app/model/pai';
import { LoginService } from 'src/app/serviços/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pai: Pai = new Pai();

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  acessar(){
    this.loginService.logar(this.pai)
    this.router.navigate(['listfilho']);
  }


}
