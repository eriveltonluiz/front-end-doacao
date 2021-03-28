import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componentes/login/login.component';
import { RouterModule } from '@angular/router';
import { PaiModule } from './componentes/pai/pai.module';
import { ListFilhoComponent } from './componentes/pai/list-filho/list-filho.component';
import { AddFilhoMateriaisComponent } from './componentes/pai/add-filho-materiais/add-filho-materiais.component';

const routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'listfilho',
    component: ListFilhoComponent
  },

  {
    path: 'addfilho',
    children: [
      {
        path: '',
        component: AddFilhoMateriaisComponent
      },

      {
        path: ':id',
        component: AddFilhoMateriaisComponent
      }
    ]
  }
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
