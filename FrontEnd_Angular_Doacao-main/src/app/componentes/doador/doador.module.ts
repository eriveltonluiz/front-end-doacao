import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ListFilhosGeralComponent } from './list-filhos-geral/list-filhos-geral.component';
import { ListMateriaisFilhoComponent } from './list-materiais-filho/list-materiais-filho.component';
import { DoacaoConfirmadaComponent } from './doacao-confirmada/doacao-confirmada.component';



@NgModule({
  declarations: [
    ListFilhosGeralComponent,
    ListMateriaisFilhoComponent,
    DoacaoConfirmadaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ]
})
export class DoadorModule { }
