import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteUpdateDeletePage } from './paciente-update-delete.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteUpdateDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteUpdateDeletePageRoutingModule {}
