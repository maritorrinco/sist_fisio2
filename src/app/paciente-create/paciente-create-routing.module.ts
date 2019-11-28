import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteCreatePage } from './paciente-create.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteCreatePageRoutingModule {}
