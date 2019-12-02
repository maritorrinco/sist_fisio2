import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteFiltroPageRoutingModule } from './paciente-filtro-routing.module';

import { PacienteFiltroPage } from './paciente-filtro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteFiltroPageRoutingModule
  ],
  declarations: [PacienteFiltroPage]
})
export class PacienteFiltroPageModule {}
