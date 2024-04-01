import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/types/serviceTypes';
import { ServicesService } from '../services-service.service';

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.scss']
})
export class SearchServicesComponent implements OnInit {

  services: Services[] = [];
  filteredServices: Services[] = [];
  searchPattern: string = '';


  constructor(private servicesService: ServicesService) {
  }


  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.servicesService.getAll().subscribe((services) => {
      this.services = services;
      this.filteredServices = services;
    })
  }

  filterServices() {
    const searchLower = this.searchPattern.toLocaleLowerCase();
    this.filteredServices = this.services.filter(service => service.name.toLowerCase().includes(searchLower))
  }


}
