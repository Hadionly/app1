import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewstudentmeetingPage } from './viewstudentmeeting.page';

const routes: Routes = [
  {
    path: '',
    component: ViewstudentmeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewstudentmeetingPageRoutingModule {}
