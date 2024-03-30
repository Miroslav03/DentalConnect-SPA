import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorType, UserType } from 'src/app/types/authTypes';
import { UserService } from 'src/app/user/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserService) {

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

}
