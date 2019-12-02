import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaclinicaPage } from './fichaclinica.page';

const routes: Routes = [
  {
    path: '',
    component: FichaclinicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaclinicaPageRoutingModule {}
