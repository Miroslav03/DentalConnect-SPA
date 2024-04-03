import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user-service.service';
import { Observable, catchError, map, of, take } from 'rxjs';
;

@Injectable({
    providedIn: 'root'
})
export class ThemeGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }
    canActivate(): Observable<boolean> {
        return this.userService.getUser().pipe(
            take(1),
            map(user => {
                if (user && 'proficiency' in user) {
                    return true;
                } else {
                    this.router.navigate(['/user/profile']);
                    return false;
                }
            }), catchError((error) => {
                if (error.status === 401) {
                    this.router.navigate(['/user/login']);
                    return of(false);
                } else {
                    return of(true);
                }
            })
        );
    }
}

