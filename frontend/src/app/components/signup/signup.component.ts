import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';

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
    private _signupService: SignupService) {
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

    this._signupService.login(user).subscribe(data => {
      console.log(data);
    }, error => this.handleError(error)
    );
  }

  handleError(error): void {
    this.error = error.error.error;
  }

}
