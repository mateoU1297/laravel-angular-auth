import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private myAppUrl: string = 'http://localhost:8000/';
  private myApiUrl: string = 'api/signup';

  constructor(private http: HttpClient) {
    
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }
}
