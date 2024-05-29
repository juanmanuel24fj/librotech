import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
  usuarios: User[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
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
