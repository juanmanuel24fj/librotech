import { Libro } from './libro.model';
import { User } from './user.model';

export class Reserva {
  id: number;
  libro: Libro;
  usuario: User;
  fechaReserva: Date;
  fechaDevolucion: Date;

  constructor(id: number, libro: Libro, usuario: User, fechaReserva: Date, fechaDevolucion: Date) {
    this.id = id;
    this.libro = libro;
    this.usuario = usuario;
    this.fechaReserva = fechaReserva;
    this.fechaDevolucion = fechaDevolucion;
  }
}
