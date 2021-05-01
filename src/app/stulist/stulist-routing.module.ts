import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StulistPage } from './stulist.page';

const routes: Routes = [
  {
    path: '',
    component: StulistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StulistPageRoutingModule {}
