import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewstudentmeetingPageRoutingModule } from './viewstudentmeeting-routing.module';

import { ViewstudentmeetingPage } from './viewstudentmeeting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewstudentmeetingPageRoutingModule
  ],
  declarations: [ViewstudentmeetingPage]
})
export class ViewstudentmeetingPageModule {}
