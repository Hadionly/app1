import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewschedtutmeetingPageRoutingModule } from './viewschedtutmeeting-routing.module';

import { ViewschedtutmeetingPage } from './viewschedtutmeeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewschedtutmeetingPageRoutingModule
  ],
  declarations: [ViewschedtutmeetingPage]
})
export class ViewschedtutmeetingPageModule {}
