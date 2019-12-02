import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteCreatePageRoutingModule } from './paciente-create-routing.module';

import { PacienteCreatePage } from './paciente-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteCreatePageRoutingModule
  ],
  declarations: [PacienteCreatePage]
})
export class PacienteCreatePageModule {}
