import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { IgxAvatarModule } from 'igniteui-angular';
import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    IgxAvatarModule,

  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
