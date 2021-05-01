import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmeetingPageRoutingModule } from './tmeeting-routing.module';

import { TmeetingPage } from './tmeeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmeetingPageRoutingModule
  ],
  declarations: [TmeetingPage]
})
export class TmeetingPageModule {}
