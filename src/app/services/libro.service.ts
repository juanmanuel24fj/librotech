import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Libro } from '../model/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:8086/api/libros';
  snackBar: any;

  constructor(private http: HttpClient) { }

  obtenerTodosLosLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  buscarLibrosPorTitulo(titulo: string): Observable<Libro[]> {
    const url = `${this.apiUrl}/titulo/${titulo}`;
    return this.http.get<Libro[]>(url).pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError(error); 
      })
    );
  }
  buscarLibrosPorAutor(autor: string): Observable<Libro[]> {
    const url = `${this.apiUrl}/autor/${autor}`;
    return this.http.get<Libro[]>(url).pipe(
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError(error);
      })
    );
  }

  crearLibro(libro:Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }


}
