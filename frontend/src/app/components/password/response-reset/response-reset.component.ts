import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { ResponsePasswordService } from 'src/app/services/response-password.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {

  public error = <any>[];
  form: FormGroup;
  token: string = null;
  
  constructor(
    private route: ActivatedRoute,
    private _responsePasswordService: ResponsePasswordService,
    private _snotifyService: SnotifyService,
    private router: Router,
    private fb: FormBuilder) {
    
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
      
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){

    const data: any = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      password_confirmation: this.form.get('password_confirmation')?.value,
      token: this.token
    }

    this._responsePasswordService.changePassword(data).subscribe(
      data => this.handleResponse(),
      error => this.handleError(error)
    );
  }

  handleResponse(){
    this._snotifyService.confirm('Done!, Now login with new password', {
      buttons:[
        {text: 'OK',
        action: toster =>{
          this.router.navigateByUrl('/login'),
          this._snotifyService.remove(toster.id)
        }
        }
      ]
    });
  }

  handleError(error: any){
    this.error = error.error.errors;
  }

}
