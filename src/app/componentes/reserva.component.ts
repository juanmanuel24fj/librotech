// src/app/componentes/reserva.component.ts
import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../model/reserva.model';
import { Libro } from '../model/libro.model';
import { User } from '../model/user.model';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html'
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  nuevaReserva: Reserva = new Reserva(
    0, 
    new Libro(0, '', '', 0, ''), 
    new User(0, '', '',''), 
    new Date(), 
    new Date());
  alertService: any;
  libro: any;

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.reservaService.obtenerReservas().subscribe(data => {
      this.reservas = data;
    });
  }
  crearReserva(): void {
    this.reservaService.crearReserva(this.nuevaReserva).subscribe(data => {
      this.reservas.push(data);
      this.nuevaReserva = new Reserva(0, new Libro(0, '', '', 0, ''), new User(0, '', '',''), new Date(), new Date());
    }, error => {
      console.error('Error al crear la reserva', error);
      alert('Error al crear la reserva');
    });
  }
  

// Método para eliminar una reserva
eliminarReserva(reservaId: number): void {
  // Lógica para eliminar la reserva en el backend
  this.reservaService.eliminarReserva(reservaId).subscribe(
    () => {
      // Si la eliminación tiene éxito, incrementa el contador de ejemplares disponibles
      this.libro.ejemplaresDisponibles++;
      // Actualiza la interfaz de usuario para reflejar el cambio
      this.actualizarContadorEjemplaresDisponibles();
      // Muestra un mensaje de éxito
      this.alertService.mostrarMensaje('Reserva eliminada correctamente.');
    },
    error => {
      // Manejar errores
      console.error('Error al eliminar la reserva:', error);
    }
  );
}

// Método para actualizar el contador de ejemplares disponibles en la interfaz de usuario
actualizarContadorEjemplaresDisponibles(): void {
  // Lógica para actualizar el contador en la interfaz de usuario
}

}
