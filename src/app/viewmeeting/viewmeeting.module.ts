import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewmeetingPageRoutingModule } from './viewmeeting-routing.module';

import { ViewmeetingPage } from './viewmeeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewmeetingPageRoutingModule
  ],
  declarations: [ViewmeetingPage]
})
export class ViewmeetingPageModule {}
