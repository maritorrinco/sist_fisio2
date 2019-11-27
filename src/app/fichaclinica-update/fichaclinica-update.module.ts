import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaclinicaUpdatePageRoutingModule } from './fichaclinica-update-routing.module';

import { FichaclinicaUpdatePage } from './fichaclinica-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaclinicaUpdatePageRoutingModule
  ],
  declarations: [FichaclinicaUpdatePage]
})
export class FichaclinicaUpdatePageModule {}
