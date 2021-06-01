import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

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
    private _loginService: LoginService) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
    }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const user: any = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this._loginService.login(user).subscribe(data => {
      console.log(data);
    }, error => this.handleError(error)
    );
  }

  handleError(error): void {
    this.error = error.error.error;
  }

}
