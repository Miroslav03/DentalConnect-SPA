import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorType, UserType } from '../types/authTypes';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<DoctorType | UserType | null>(null);
  private user$ = this.user$$.asObservable();

  user: DoctorType | UserType | null = null

  userSubscribtion: Subscription;

  constructor(private http: HttpClient) {
    this.userSubscribtion = this.user$.subscribe((user) => {
      this.user = user
    })
  }

  isLoggedIn(): { isLoggedIn: boolean, userType?: string } {
    const loggedIn = !!this.user;
    let userType: string | undefined;

    if (this.user) {
      userType = 'proficiency' in this.user ? 'doctor' : 'user';
    }
    console.log(userType);
    
    return {
      isLoggedIn: loggedIn,
      userType: userType
    };
  }


  getUser() {
    return this.http.get<UserType | DoctorType>('http://localhost:3000/auth/common/profile', { withCredentials: true }).pipe(tap((user) => this.user$$.next(user)));
  }

  registerDoctor(username: string, email: string, proficiency: string, password: string) {
    return this.http.post<DoctorType>('http://localhost:3000/auth/doctor/register', { username, email, proficiency, password }, { withCredentials: true }).pipe(tap((user) => this.user$$.next(user)))
  }

  registerUser(username: string, email: string, password: string) {
    return this.http.post<UserType>('http://localhost:3000/auth/user/register', { username, email, password }, { withCredentials: true }).pipe(tap((user) => {
      console.log(user);
      this.user$$.next(user)
    }))
  }



  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
  }
}
