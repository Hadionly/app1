import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TformviewPageRoutingModule } from './tformview-routing.module';

import { TformviewPage } from './tformview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TformviewPageRoutingModule
  ],
  declarations: [TformviewPage]
})
export class TformviewPageModule {}
