import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCalendarModule  } from 'ionic2-calendar';
import { IonicModule } from '@ionic/angular';

import { ViewcalPageRoutingModule } from './viewcal-routing.module';

import { ViewcalPage } from './viewcal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewcalPageRoutingModule,
    ReactiveFormsModule,
    NgCalendarModule
  ],
  declarations: [ViewcalPage]
})
export class ViewcalPageModule {}
