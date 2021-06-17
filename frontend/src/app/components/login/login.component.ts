import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: '';

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private _tokenService: TokenService,
    private _authService: AuthService,
    private router: Router) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
    }

  ngOnInit(){

  }

  onSubmit(){

    const user: any = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this._loginService.login(user).subscribe(
      data  => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    this._tokenService.handle(data.access_token);
    this._authService.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error){
    this.error = error.error.error;
  }

}
