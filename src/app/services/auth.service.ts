import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'http://localhost:8086/api/usuario'; 
  private usuarioAutenticado: boolean = false;

  constructor(private http: HttpClient) { }

  register(username: string, password: string, email: string): Observable<any> {
    const user = { username, password, email };
    return this.http.post<any>(`${this.apiUrl}/registro`, user);
  }
  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap({
        error: (error) => {
          console.error('Login failed', error);
        }
      })
    );
  }
  
}

