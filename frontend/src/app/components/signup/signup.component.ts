import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  error: '';

  constructor(
    private fb: FormBuilder,
    private _signupService: SignupService,
    private _tokenService: TokenService,
    private router: Router) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password_confirmation: ['', [Validators.required]]
      })
    }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const user: any = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      password_confirmation: this.form.get('password_confirmation')?.value
    }

    this._signupService.login(user).subscribe(
      data  => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error): void {
    this.error = error.error.error;
  }

  handleResponse(data){
    this._tokenService.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

}
