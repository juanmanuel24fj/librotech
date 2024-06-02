// src/app/services/reserva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../model/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'https://librotech-api.onrender.com/api/reservas';

  constructor(private http: HttpClient) {}

  crearReserva(libroId: number, usuarioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservar/${libroId}/${usuarioId}`, {});
  }

  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  eliminarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  reservarLibro(libroId: number, usuarioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservar/${libroId}/${usuarioId}`, {});
  }
  devolverLibro(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/devolver/${id}`, {});
  }
}
