import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfcreatePage } from './profcreate.page';

const routes: Routes = [
  {
    path: '',
    component: ProfcreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfcreatePageRoutingModule {}
