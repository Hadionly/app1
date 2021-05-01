import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TformPage } from './tform.page';

const routes: Routes = [
  {
    path: '',
    component: TformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TformPageRoutingModule {}
