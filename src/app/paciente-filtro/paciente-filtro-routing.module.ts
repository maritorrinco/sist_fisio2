import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteFiltroPage } from './paciente-filtro.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteFiltroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteFiltroPageRoutingModule {}
