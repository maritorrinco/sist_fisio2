import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaListPageRoutingModule } from './reserva-list-routing.module';

import { ReservaListPage } from './reserva-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaListPageRoutingModule
  ],
  declarations: [ReservaListPage]
})
export class ReservaListPageModule {}
