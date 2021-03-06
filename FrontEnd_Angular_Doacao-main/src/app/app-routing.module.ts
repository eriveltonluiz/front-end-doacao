import { ListMateriaisFilhoComponent } from './componentes/doador/list-materiais-filho/list-materiais-filho.component';
import { DoadorModule } from './componentes/doador/doador.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componentes/login/login.component';
import { RouterModule } from '@angular/router';
import { PaiModule } from './componentes/pai/pai.module';
import { ListFilhoComponent } from './componentes/pai/list-filho/list-filho.component';
import { AddFilhoComponent } from './componentes/pai/add-filho/add-filho.component';
import { ListFilhosGeralComponent } from './componentes/doador/list-filhos-geral/list-filhos-geral.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardianGuard } from './serviços/auth-guardian.guard';
import { DoacaoConfirmadaComponent } from './componentes/doador/doacao-confirmada/doacao-confirmada.component';

const routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardianGuard],
  },

  {
    path: 'detalhes',
    component: DoacaoConfirmadaComponent
  },

  {
    path: 'listfilho',
    component: ListFilhoComponent
  },

  {
    path: 'listfilhosgeral',
    component: ListFilhosGeralComponent
  },

  {
    path: 'doacao',
    component: ListMateriaisFilhoComponent
  },

  

  {
    path: 'addfilho',
    children: [
      {
        path: '',
        component: AddFilhoComponent
      },

      {
        path: ':id',
        component: AddFilhoComponent
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
    PaiModule,
    DoadorModule,
    NgbModule
  ]
})
export class AppRoutingModule { }
