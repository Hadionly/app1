import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PmeetingPageRoutingModule } from './pmeeting-routing.module';

import { PmeetingPage } from './pmeeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PmeetingPageRoutingModule
  ],
  declarations: [PmeetingPage]
})
export class PmeetingPageModule {}
