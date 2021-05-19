import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'sign-up',
  component: SignupComponent
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'request-reset',
  component: RequestResetComponent
},
{
  path: 'response-reset',
  component: ResponseResetComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
