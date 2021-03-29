import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFilhosGeralComponent } from './list-filhos-geral/list-filhos-geral.component';



@NgModule({
  declarations: [
    ListFilhosGeralComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ]
})
export class DoadorModule { }
