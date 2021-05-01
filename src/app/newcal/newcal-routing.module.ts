import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcalPage } from './newcal.page';

const routes: Routes = [
  {
    path: '',
    component: NewcalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewcalPageRoutingModule {}
