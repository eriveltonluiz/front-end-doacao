import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFilhosGeralComponent } from './list-filhos-geral/list-filhos-geral.component';



@NgModule({
  declarations: [
    ListFilhosGeralComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DoadorModule { }
