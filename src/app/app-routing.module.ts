import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login',component:LoginComponent },
  { path: 'registration', component: RegistrationComponent },

  {path: 'home',component:HomeComponent,canActivate:[RouteGuardService]},
  { path: 'main', component: MainComponent ,canActivate:[RouteGuardService]},
  { path: 'logout', component: LogoutComponent,canActivate:[RouteGuardService] },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
