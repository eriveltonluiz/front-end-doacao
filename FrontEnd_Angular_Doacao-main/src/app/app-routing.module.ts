import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componentes/login/login.component';
import { RouterModule } from '@angular/router';
import { PaiModule } from './componentes/pai/pai.module';

const routes = [
  {
    path: '',
    component: LoginComponent
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    PaiModule
  ]
})
export class AppRoutingModule { }
