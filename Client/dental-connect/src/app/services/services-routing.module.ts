import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllServicesComponent } from "./all-services/all-services.component";


const routes: Routes = [
    {
        path: 'services', children: [
            { path: 'all', component: AllServicesComponent }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ServicesRoutingModule {

}

