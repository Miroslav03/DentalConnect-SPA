import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pattern } from 'src/app/shared/variables';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  form = this.fb.group({
    email: ['', [Validators.required,]],
    password: ['', [Validators.required,]]
  });


  login() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.userService.login(email!, password!).subscribe(() => {
      this.router.navigate(['/services/all']);
    },
      (error) => {
        this.form.setErrors({
          'loginError':'Invalid email or password.'
        })
      })
  }
}
