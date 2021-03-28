import { AddFilhoComponent } from './add-filho/add-filho.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListFilhoComponent } from './list-filho/list-filho.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListMateriaisComponent } from './material/list-materiais/list-materiais.component';
import { AddMaterialComponent } from './material/add-material/add-material.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    CadastroComponent,
    ListFilhoComponent,
    AddFilhoComponent,
    ListMateriaisComponent,
    AddMaterialComponent
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
