import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user-service.service';
import { Observable, catchError, map, of, take } from 'rxjs';
;

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }
    user: any
    canActivate(): Observable<boolean> {
        return this.userService.getUser().pipe(
            take(1),
            map(user => {
                if (!user) {
                    return true;
                } else {
                    this.router.navigate(['/user/profile']);
                    return false;
                }
            }), catchError((error) => {
                if (error.status === 401) {
                    return of(true);
                } else {
                    return of(false);
                }
            })
        );
    }
}

