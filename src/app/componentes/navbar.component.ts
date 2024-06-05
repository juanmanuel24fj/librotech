import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private router:Router,
              private authService: AuthService 
  ){}

  isLogin(){
    return this.router.url=='/login';
  }
  isregister(){
    return this.router.url=='/register';
  }

  logout() {
    this.authService.logout()
  }
}
