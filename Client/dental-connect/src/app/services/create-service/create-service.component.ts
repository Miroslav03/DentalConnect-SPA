import { Component } from '@angular/core';
import { ServicesService } from '../services-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent {
  constructor(private serviceService: ServicesService, private fb: FormBuilder, private router: Router) { }

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    duration: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    imgURL: ['', [Validators.required, Validators.pattern('^(http|https):\/\/.*')]]
  })

  create() {

    if (this.form.invalid) {
      return;
    }

    const { name, description, price, duration, imgURL } = this.form.value;

    this.serviceService.createService(name!, description!, Number(price)!, Number(duration)!, imgURL!).subscribe(() => {
      this.router.navigate(['/services/all']);
    })
  }


}
