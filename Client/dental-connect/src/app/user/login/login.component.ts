import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pattern } from 'src/app/shared/variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(pattern)]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });


  login() {

  }
}
