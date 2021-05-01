import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StulistPageRoutingModule } from './stulist-routing.module';

import { StulistPage } from './stulist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StulistPageRoutingModule
  ],
  declarations: [StulistPage]
})
export class StulistPageModule {}
