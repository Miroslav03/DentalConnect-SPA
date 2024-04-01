import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services-service.service';
import { Subscription } from 'rxjs';
import { Services } from 'src/app/types/serviceTypes';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {

  services: Services[] = []

  constructor(private servicesService: ServicesService) {
  }

  ngOnInit(): void {
    this.servicesService.getAll().subscribe((services) => {
      this.services = services;
    })
  }
}
