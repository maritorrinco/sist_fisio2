import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaListPage } from './reserva-list.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaListPageRoutingModule {}
