import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PformPageRoutingModule } from './pform-routing.module';

import { PformPage } from './pform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PformPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PformPage]
})
export class PformPageModule {}
