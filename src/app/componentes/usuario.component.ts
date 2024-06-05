import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
  usuarios: User[] = [];
  role = this.authService.role 

  constructor(private usuarioService: UsuarioService,
              private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.update()
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.obtenerTodosLosUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    });
  }
}
