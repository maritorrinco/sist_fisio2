import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaCreatePage } from './reserva-create.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaCreatePageRoutingModule {}
