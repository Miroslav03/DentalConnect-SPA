import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../user/user-service.service";

@Injectable({
    providedIn: 'root'
})

export class AuthActivate implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }

    canActivate(): boolean {
        const user = this.userService.user;
        const isLoggedIn = !!user;

        if (isLoggedIn) {
            if ('proficiency' in user) {
                // Doctor
                this.router.navigate(['/user/profile']); // or wherever the doctor profile page is
                return false;
            } else {
                // User
                return true;
            }
        } else {
            // Not logged in
            this.router.navigate(['/user/login']); // or wherever the login page is
            return false;
        }
    }
}