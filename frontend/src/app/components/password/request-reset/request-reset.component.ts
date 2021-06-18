import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SnotifyService} from 'ng-snotify';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private _snotifyService: SnotifyService,
    private _resetPassword: ResetPasswordService,
    private fb: FormBuilder){
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this._snotifyService.info('Wait...', {timeout: 4000});

    const data: any = {
      email: this.form.get('email')?.value,
    }

    this._resetPassword.sendPasswordResetLink(data).subscribe(
      data => this.handleResponse(data),
      error => this._snotifyService.error(error.error.error)
      
    );
  }

  handleResponse(res: any){
    this._snotifyService.success(res.data, {timeout: 0});
    this.form.reset();
  }

}
