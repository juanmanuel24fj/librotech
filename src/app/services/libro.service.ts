import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Libro } from '../model/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'https://librotech-api.onrender.com/api/libros';

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


  crearLibro(formData: FormData): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, formData);
  }
  
}
