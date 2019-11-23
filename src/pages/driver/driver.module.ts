import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverPage } from './driver';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    DriverPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverPage),
    AgmCoreModule
  ],
})
export class DriverPageModule {}
