import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewschedtutmeetingPage } from './viewschedtutmeeting.page';

const routes: Routes = [
  {
    path: '',
    component: ViewschedtutmeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewschedtutmeetingPageRoutingModule {}
