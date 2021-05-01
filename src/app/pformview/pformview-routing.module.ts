import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PformviewPage } from './pformview.page';

const routes: Routes = [
  {
    path: '',
    component: PformviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PformviewPageRoutingModule {}
