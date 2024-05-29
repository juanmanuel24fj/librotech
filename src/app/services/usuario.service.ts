import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://librotech-api.onrender.com/api/usuario';

  constructor(private http: HttpClient) {}

  
  obtenerTodosLosUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }


  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
