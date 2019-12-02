import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaEditPageRoutingModule } from './reserva-edit-routing.module';

import { ReservaEditPage } from './reserva-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaEditPageRoutingModule
  ],
  declarations: [ReservaEditPage]
})
export class ReservaEditPageModule {}
