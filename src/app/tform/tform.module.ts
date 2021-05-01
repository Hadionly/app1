import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TformPageRoutingModule } from './tform-routing.module';

import { TformPage } from './tform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TformPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TformPage]
})
export class TformPageModule {}
