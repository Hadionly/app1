import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorcreatePage } from './tutorcreate.page';

const routes: Routes = [
  {
    path: '',
    component: TutorcreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorcreatePageRoutingModule {}
