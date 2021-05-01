import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TformviewPage } from './tformview.page';

const routes: Routes = [
  {
    path: '',
    component: TformviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TformviewPageRoutingModule {}
