import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'frontend';
  
  constructor(private router: Router){}
  ngOnDestroy(): void {
    localStorage.clear()
  }
  
  ngOnInit(): void {
    if((localStorage.getItem('id') === null || localStorage.getItem('id') === undefined) && !this.router.navigate(['/listfilhosgeral'])){
      this.router.navigate([''])
    }
  }
  
  esconderMenuPai(): boolean{
    if(this.router.url !== '/listfilho'){ 
      if(this.router.url !== '/addfilho'){
        if(!this.router.url.includes('/addfilho/')){
          return true;
        }
      }
    }
    return false;
  }
  
  esconderMenuDoador(): boolean{
    console.log(this.router.url);
    if(this.router.url === '/listfilho' || this.router.url.includes('/addfilho/') || this.router.url === '/addfilho')
      return true;
    return false;
  }

  sair(){
    localStorage.clear();
    this.router.navigate([''])
  }
}