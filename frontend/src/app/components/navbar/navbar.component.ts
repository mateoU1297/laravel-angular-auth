import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;

  constructor(
    private _authService: AuthService,
    private _tokenService: TokenService,
    private router: Router) { 
    
  }

  ngOnInit(){
    this._authService.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent){  
    event.preventDefault();
    this._tokenService.remove();
    this._authService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
