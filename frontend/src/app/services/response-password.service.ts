import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsePasswordService {

  private myAppUrl: string = 'http://localhost:8000/';
  private myApiUrl: string = 'api/reset-password';

  constructor(
    private http: HttpClient) {
    
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, data);
  }
}
