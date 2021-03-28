import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pai } from 'src/app/model/pai';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  acessar(){
    this.router.navigate(['listfilho']);
  }


}
