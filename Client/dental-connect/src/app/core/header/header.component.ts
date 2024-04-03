import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserService, private router: Router) {

  }


  get isDoctor(): boolean | undefined {
    if (this.userService.isLoggedIn().userType === 'doctor') {
      return true;
    } else {
      return undefined;
    }
  }

  get isUser(): boolean | undefined {
    if (this.userService.isLoggedIn().userType === 'user') {
      return true;
    } else {
      return undefined;
    }
  }



  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/user/login']);
      },
      error: () => {
        this.router.navigate(['/user/login']);
      }
    })
  }
}
