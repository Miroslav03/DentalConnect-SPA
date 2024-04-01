import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllServicesComponent } from "./all-services/all-services.component";
import { SearchServicesComponent } from "./search-services/search-services.component";
import { CreateServiceComponent } from "./create-service/create-service.component";
import { DetailsServiceComponent } from "./details-service/details-service.component";
import { EditServiceComponent } from "./edit-service/edit-service.component";


const routes: Routes = [
    {
        path: 'services', children: [
            { path: 'all', component: AllServicesComponent },
            { path: 'search', component: SearchServicesComponent },
            { path: 'create', component: CreateServiceComponent },
            { path: 'details/:id', component: DetailsServiceComponent },
            { path: 'edit', component: EditServiceComponent },
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ServicesRoutingModule {

}

