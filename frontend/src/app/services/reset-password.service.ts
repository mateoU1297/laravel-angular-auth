import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private myAppUrl: string = 'http://localhost:8000/';
  private myApiUrl: string = 'api/send-password-reset-link';

  constructor(
    private http: HttpClient) {
    
  }

  sendPasswordResetLink(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, data);
  }
}
