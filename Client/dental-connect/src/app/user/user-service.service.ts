import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorType, UserType } from '../types/authTypes';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: DoctorType | UserType | null = null


  constructor(private http: HttpClient) {
  }


  isLoggedIn(): { isLoggedIn: boolean, userType?: string, user: DoctorType | UserType | null } {
    const loggedIn = !!this.user;
    let userType: string | undefined;

    if (this.user) {
      userType = 'proficiency' in this.user ? 'doctor' : 'user';
    }

    return {
      isLoggedIn: loggedIn,
      userType: userType,
      user: this.user
    };
  }



  getUser() {
    return this.http.get<UserType | DoctorType>('http://localhost:3000/auth/common/profile', { withCredentials: true }).pipe(tap((user) => this.user = (user)));
  }

  login(email: string, password: string) {
    return this.http.post<UserType | DoctorType>('http://localhost:3000/auth/common/login', { email, password }, { withCredentials: true }).pipe(tap((user) => this.user = (user)))
  }

  logout() {
    return this.http.get('http://localhost:3000/auth/common/logout', { withCredentials: true }).pipe(tap(() => { this.user = (null) }))
  }

  registerDoctor(username: string, email: string, proficiency: string, password: string) {
    return this.http.post<DoctorType>('http://localhost:3000/auth/doctor/register', { username, email, proficiency, password }, { withCredentials: true }).pipe(tap((user) => this.user = (user)))
  }

  registerUser(username: string, email: string, password: string) {
    return this.http.post<UserType>('http://localhost:3000/auth/user/register', { username, email, password }, { withCredentials: true }).pipe(tap((user) => { this.user = (user) }))
  }

}
