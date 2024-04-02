import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthActivate } from "../guards/auth.activate";


const routes: Routes = [
    {
        path: 'user', children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [AuthActivate] // Add this line
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [AuthActivate] // Add this line
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthActivate] // You can add this if needed
            },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule {

}