import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaEditPage } from './reserva-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaEditPageRoutingModule {}
