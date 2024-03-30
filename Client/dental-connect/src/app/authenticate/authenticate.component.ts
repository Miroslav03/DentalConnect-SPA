import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit, OnDestroy {

  isAuthenticating = true;
  private userSub: Subscription = new Subscription();

  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    this.userSub = this.userService.getUser().subscribe({

      next: (user) => {
        this.userService.getUser().subscribe({
          next: () => {
            this.isAuthenticating = false;
          }
        })
      },
      error: () => {
        this.isAuthenticating = false;
      }
    })

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
