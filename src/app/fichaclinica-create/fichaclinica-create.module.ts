import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaclinicaCreatePageRoutingModule } from './fichaclinica-create-routing.module';

import { FichaclinicaCreatePage } from './fichaclinica-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaclinicaCreatePageRoutingModule
  ],
  declarations: [FichaclinicaCreatePage]
})
export class FichaclinicaCreatePageModule {}
