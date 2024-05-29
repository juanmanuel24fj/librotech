import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../model/credentials.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  credentials: Credentials = new Credentials('', '', ''); 

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.authService.register(this.credentials.username, this.credentials.password, this.credentials.email)
      .subscribe(
        (data) => {
          this.router.navigate(['/libros']);

          console.log("Usuario registrado exitosamente", data);
        },
        (error) => {
          console.error("Error al registrar usuario", error);
        }
      );
  }
  switchToLogin() {
    this.router.navigate(['/login']);
  }
  
}
