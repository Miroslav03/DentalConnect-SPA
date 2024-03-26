import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllServicesComponent } from './all-services/all-services.component';
import { ServicesRoutingModule } from './services-routing.module';



@NgModule({
  declarations: [
    AllServicesComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
