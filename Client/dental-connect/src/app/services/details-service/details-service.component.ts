import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from 'src/app/types/serviceTypes';
import { UserService } from 'src/app/user/user-service.service';
import { UserType } from 'src/app/types/authTypes';

@Component({
  selector: 'app-details-service',
  templateUrl: './details-service.component.html',
  styleUrls: ['./details-service.component.scss']
})
export class DetailsServiceComponent implements OnInit {

  serviceId: string | null = '';
  service: Services | null = null;
  userId: string | null = '';

  constructor(
    private serviceService: ServicesService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

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

  get isOwner(): boolean | undefined {
    if (this.userService.isLoggedIn().userType === 'doctor') {
      return this.userService.isLoggedIn().user?._id === this.service?.owner._id;
    } else {
      return undefined;
    }
  }

  get isPurchesed(): boolean | undefined {
    const userId = this.userService.isLoggedIn().user?._id;

    if (userId && this.service?.signed.some(user => userId === user._id)) {
      return true;
    } else {
      return undefined;
    }
  }

  ngOnInit(): void {
    this.serviceId = this.activeRoute.snapshot.paramMap.get("id");
    this.serviceService.getOne(this.serviceId!).subscribe((service) => {
      this.service = service;
    })

  }

  delete() {
    this.serviceService.deleteService(this.serviceId!).subscribe(() => {
      this.router.navigate(['/services/all']);
    });
  }

  buy() {
    const userId = this.userService.isLoggedIn().user?._id;

    this.serviceService.buyService(this.serviceId!, userId!).subscribe(() => {
      this.router.navigate(['/services/all']);
    });
  }
}
