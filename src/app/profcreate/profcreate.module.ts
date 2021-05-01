import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfcreatePageRoutingModule } from './profcreate-routing.module';

import { ProfcreatePage } from './profcreate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfcreatePageRoutingModule
  ],
  declarations: [ProfcreatePage]
})
export class ProfcreatePageModule {}
