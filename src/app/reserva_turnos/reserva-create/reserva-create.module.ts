import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaCreatePageRoutingModule } from './reserva-create-routing.module';

import { ReservaCreatePage } from './reserva-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaCreatePageRoutingModule
  ],
  declarations: [ReservaCreatePage]
})
export class ReservaCreatePageModule {}
