import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllServicesComponent } from './all-services/all-services.component';
import { ServicesRoutingModule } from './services-routing.module';
import { SearchServicesComponent } from './search-services/search-services.component';
import { DetailsServiceComponent } from './details-service/details-service.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AllServicesComponent,
    SearchServicesComponent,
    DetailsServiceComponent,
    CreateServiceComponent,
    EditServiceComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ServicesModule { }
