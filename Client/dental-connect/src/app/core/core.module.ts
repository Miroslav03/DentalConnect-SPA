import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from '../user/user-routing.module';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AboutComponent,
    HomeComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule
  ],
  exports: [HeaderComponent, AboutComponent, HomeComponent, ErrorPageComponent]
})
export class CoreModule { }
