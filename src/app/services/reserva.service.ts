// src/app/services/reserva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../model/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8086/api/reservas';

  constructor(private http: HttpClient) {}

  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
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
}
