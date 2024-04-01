import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../services-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from 'src/app/types/serviceTypes';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  serviceId: string | null = '';
  service: Services | null = null;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServicesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [Number(''), [Validators.required, Validators.pattern('^[0-9]+$')]],
    duration: [Number(''), [Validators.required, Validators.pattern('^[0-9]+$')]],
    imgURL: ['', [Validators.required, Validators.pattern('^(http|https):\/\/.*')]]
  })


  ngOnInit(): void {
    this.serviceId = this.activeRoute.snapshot.paramMap.get('id');
    this.serviceService.getOne(this.serviceId!).subscribe((service) => {
      this.service = service;
      
      this.form.patchValue({
        name: this.service?.name,
        description: this.service?.description,
        price: this.service?.price,
        duration: this.service?.duration,
        imgURL: this.service?.imgURL,
      })
    })
  }

  edit() {
    if (this.form.invalid) {
      return;
    }

    const { name, description, price, duration, imgURL } = this.form.value;

    this.serviceService.editService(name!, description!, Number(price)!, Number(duration)!, imgURL!, this.serviceId!).subscribe(() => {
      this.router.navigate([`/services/details/${this.serviceId}`]);
    })
  }
}
