import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { DoctorType, UserType } from 'src/app/types/authTypes';
import { Services } from 'src/app/types/serviceTypes';
import { ServicesService } from 'src/app/services/services-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  services: Services[] = [];
  user: UserType | DoctorType | null = null;
  userType: string | undefined = '';
  
  constructor(private userService: UserService, private serviceServices: ServicesService) {
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

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      if (this.user.hasOwnProperty('proficiency')) {
        this.userType = 'doctor';
      } else {
        this.userType = 'user';
      }
      if (this.userType === 'doctor') {
        this.serviceServices.getAllForDoctor(this.user?._id!).subscribe((services) => {
          this.services = services as Services[];
        })
      } else if (this.userType === 'user') {
        this.serviceServices.getAllForUser(this.user?._id!).subscribe((services) => {
          this.services = services as Services[];
        })
      }
    })
  }
}
