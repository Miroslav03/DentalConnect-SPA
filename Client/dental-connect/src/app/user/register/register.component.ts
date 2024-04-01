import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user-service.service';
import { matchPasswordsValidator } from 'src/app/shared/utils';
import { pattern } from 'src/app/shared/variables';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.pattern(pattern)]],
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
    const usernameControl = this.form.get('username');
    const emailControl = this.form.get('email');
    const passwordControl = this.form.get('passGroup.password');
    const rePassControl = this.form.get('passGroup.rePass');
    const proficiencyControl = this.form.get('proficiency');

    if (this.isDoctorChecked) {
      if (!usernameControl?.valid || !emailControl?.valid || !passwordControl?.valid || !rePassControl?.valid || !proficiencyControl?.valid || rePassControl.value !== passwordControl.value) {
        return;
      }

      const { username, email, passGroup: { password } = {}, proficiency } = this.form.value;

      this.userService.registerDoctor(username!, email!, proficiency!, password!).subscribe(() => {
        this.router.navigate(['/services/all']);
      });

    } else {
      if (!usernameControl?.valid || !emailControl?.valid || !passwordControl?.valid || !rePassControl?.valid || rePassControl.value !== passwordControl.value) {
        return;
      }

      const { username, email, passGroup: { password } = {} } = this.form.value;

      this.userService.registerUser(username!, email!, password!).subscribe(() => {
        this.router.navigate(['/services/all']);
      });
    }
  }

}
