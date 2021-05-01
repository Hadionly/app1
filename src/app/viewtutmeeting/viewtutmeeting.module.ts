import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewtutmeetingPageRoutingModule } from './viewtutmeeting-routing.module';

import { ViewtutmeetingPage } from './viewtutmeeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewtutmeetingPageRoutingModule
  ],
  declarations: [ViewtutmeetingPage]
})
export class ViewtutmeetingPageModule {}
