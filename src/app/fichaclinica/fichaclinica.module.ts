import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaclinicaPageRoutingModule } from './fichaclinica-routing.module';

import { FichaclinicaPage } from './fichaclinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaclinicaPageRoutingModule
  ],
  declarations: [FichaclinicaPage]
})
export class FichaclinicaPageModule {}
