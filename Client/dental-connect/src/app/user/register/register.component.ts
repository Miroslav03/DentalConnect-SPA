import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user-service.service';
import { matchPasswordsValidator } from 'src/app/shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isDoctorChecked: boolean = false;

  toogleDoctorField(event: any) {
    this.isDoctorChecked = event.target.checked;
  }

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePass: ['', [Validators.required,]]
      },
      {
        validators: [matchPasswordsValidator('password', 'rePass')]
      },
    ),
    proficiency: ['', [Validators.required, Validators.minLength(5)]],
  })

  register() {

  }
}
