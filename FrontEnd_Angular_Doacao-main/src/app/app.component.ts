import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'frontend';
  
  constructor(private router: Router){}
  
  ngOnInit(): void {
    if(localStorage.getItem('id') === null || localStorage.getItem('id') === undefined){
      this.router.navigate([''])
    }
  }

  sair(){
    localStorage.clear();
    this.router.navigate([''])
  }
}
