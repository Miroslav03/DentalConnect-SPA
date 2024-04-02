import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from '../services-service.service';
import { Services } from 'src/app/types/serviceTypes';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {
  @Input() services: Services[] = [];
  @Input() showHeading = true;
  @Input() showSubscribtions = false;
  @Input() showYourServices = false;

  constructor(private servicesService: ServicesService) {
  }

  ngOnInit(): void {
    this.servicesService.getAll().subscribe((services) => {
      this.services = services;
    })
  }
}
