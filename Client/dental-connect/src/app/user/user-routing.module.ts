import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "../guards/auth.guard";
import { ProfileGuard } from "../guards/profile.guard";

const routes: Routes = [
    {

        path: 'user', children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [AuthGuard]

            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [ProfileGuard]
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