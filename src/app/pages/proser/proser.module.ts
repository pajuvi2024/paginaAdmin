import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProserPageRoutingModule } from './proser-routing.module';

import { ProserPage } from './proser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProserPageRoutingModule
  ],
  declarations: [ProserPage]
})
export class ProserPageModule {}
