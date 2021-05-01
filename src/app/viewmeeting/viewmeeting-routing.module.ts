import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewmeetingPage } from './viewmeeting.page';

const routes: Routes = [
  {
    path: '',
    component: ViewmeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewmeetingPageRoutingModule {}
