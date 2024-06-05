import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../model/user.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'https://librotech-api.onrender.com/api/usuario'; 
  private usuarioAutenticado: boolean = false;

  user!: User

  email= signal("")
  role = signal("")
  id= signal(0)

  constructor(private http: HttpClient,
              private router: Router) { }

  register(username: string, password: string, email: string): Observable<any> {
    const user = { username, password, email };
    return this.http.post<any>(`${this.apiUrl}/registro`, user);
  }

  storageUser(resp: any){
    localStorage.setItem('token', resp.token)
    console.log(jwtDecode(resp.token))
    this.user = resp
  }

  login(username: string, password: string): Observable<Boolean | string> {
    return this.http.post<User>(`${this.apiUrl}/signin`, { username, password })
      .pipe(
        tap(resp => {
          this.storageUser(resp);
        }),
        map(resp => true),
        catchError(err => of(err.error.msg))
      )
  }

  update() {
    if (localStorage.getItem("token") !=null){
      const decodedToken : any = jwtDecode(localStorage.getItem("token") || "")
      this.email.update(old => decodedToken.email)
      this.role.update(old => decodedToken.role)
      this.id.update(old => decodedToken.id)
    }
    
  }

  isAuthenticated() {
    let token = localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token") as string)  : null
    if (token!=null) {
      return true
    }else {
      return false
    }
  }

  isAdmin() {
    const decodedToken : any = jwtDecode(localStorage.getItem("token") || "")
    const role = decodedToken.role 
    return role === 'ROLE_ADMIN' ? true : false
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/')
  }
  
}

