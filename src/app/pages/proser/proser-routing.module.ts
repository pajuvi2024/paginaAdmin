import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProserPage } from './proser.page';

const routes: Routes = [
  {
    path: '',
    component: ProserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProserPageRoutingModule {}
