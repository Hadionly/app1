import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PformviewPageRoutingModule } from './pformview-routing.module';

import { PformviewPage } from './pformview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PformviewPageRoutingModule
  ],
  declarations: [PformviewPage]
})
export class PformviewPageModule {}
