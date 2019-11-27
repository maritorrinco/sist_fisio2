import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaclinicaUpdatePage } from './fichaclinica-update.page';

const routes: Routes = [
  {
    path: '',
    component: FichaclinicaUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaclinicaUpdatePageRoutingModule {}
