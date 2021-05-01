import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PmeetingPage } from './pmeeting.page';

const routes: Routes = [
  {
    path: '',
    component: PmeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmeetingPageRoutingModule {}
