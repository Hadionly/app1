import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewtutmeetingPage } from './viewtutmeeting.page';

const routes: Routes = [
  {
    path: '',
    component: ViewtutmeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewtutmeetingPageRoutingModule {}
