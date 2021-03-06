import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'frontend';

  

  constructor(private router: Router) { }

  ngOnInit(): void {

    console.log()

    if ((localStorage.getItem('id') === null || localStorage.getItem('id') === undefined)
      && ((this.router.url.includes('listfilhosgeral')) || 
        (this.router.url.includes('doacao')) || 
        (this.router.url.includes('detalhes')))) {
      this.router.navigate(['']);
      console.log(this.router.url);
    }
    console.log(localStorage.getItem('id'));

    if(localStorage.getItem('id') !== null && this.router.url === ''){
      this.router.navigate(['listfilho'])
    }
  }

  esconderMenuPai(): boolean {
    if (this.router.url !== '/listfilho') {
      if (this.router.url !== '/addfilho') {
        if (!this.router.url.includes('/addfilho/')) {
          return true;
        }
      }
    }
    return false;
  }

  esconderMenuDoador(): boolean {
    //console.log(this.router.url);
    if (this.router.url === '/listfilho' || this.router.url.includes('/addfilho/') || this.router.url === '/addfilho')
      return true;
    return false;
  }

  chamarCadastro(){
    let btn = document.getElementById("btnCadastro");
    btn.click();
  }

  sair() {
    localStorage.clear();
    localStorage.removeItem('id')
    this.router.navigate(['/'])
  }
}