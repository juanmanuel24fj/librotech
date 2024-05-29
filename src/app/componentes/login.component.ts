import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../model/credentials.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: Credentials = new Credentials('', '', '');

  constructor(private authService: AuthService, private router: Router) { }
  onLogin() {
    this.authService.login(this.credentials.username, this.credentials.password).subscribe(
      (data) => {
        this.router.navigate(['/libros']);
        console.log("Bien al iniciar sesión");
      },
      (error) => {
        console.error("Error al iniciar sesión", error);
      }
    );
  }
  switchToRegister() {
    this.router.navigate(['/register']); 
  }
}
