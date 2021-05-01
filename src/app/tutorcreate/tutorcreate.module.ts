import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorcreatePageRoutingModule } from './tutorcreate-routing.module';

import { TutorcreatePage } from './tutorcreate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorcreatePageRoutingModule
  ],
  declarations: [TutorcreatePage]
})
export class TutorcreatePageModule {}
