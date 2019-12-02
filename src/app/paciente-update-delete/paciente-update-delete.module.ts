import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteUpdateDeletePageRoutingModule } from './paciente-update-delete-routing.module';

import { PacienteUpdateDeletePage } from './paciente-update-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteUpdateDeletePageRoutingModule
  ],
  declarations: [PacienteUpdateDeletePage]
})
export class PacienteUpdateDeletePageModule {}
