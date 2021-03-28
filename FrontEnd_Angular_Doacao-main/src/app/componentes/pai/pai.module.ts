import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListFilhoComponent } from './list-filho/list-filho.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AddFilhoMateriaisComponent } from './add-filho-materiais/add-filho-materiais.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    CadastroComponent,
    ListFilhoComponent,
    AddFilhoMateriaisComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbModule
  ],
  exports: [
    CadastroComponent
  ]
})
export class PaiModule { }
