import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewcalPage } from './viewcal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewcalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewcalPageRoutingModule {}
