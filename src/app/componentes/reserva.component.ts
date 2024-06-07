import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { Reserva } from '../model/reserva.model';
import { Libro } from '../model/libro.model';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html'
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  role = this.authService.role
  id=this.authService.id();
   nuevaReserva: Reserva = new Reserva(
    0, 
    new Libro(0, '', '', 0, ''), 
    null, 
    new Date(), 
    new Date()
  );
  alertService: any;
  libro: any;
  snackBar: any;

  constructor(private reservaService: ReservaService,
              private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.update()
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.reservaService.obtenerReservas().subscribe(data => {
      this.reservas = data;
    });
  }

crearReserva(libroId: number): void {
    this.reservaService.crearReserva(libroId, this.id()).subscribe(
      () => {
        this.obtenerReservas();
        this.snackBar.open('Reserva creada exitosamente.', 'Cerrar', { duration: 3000 });
      },
      error => {
        let errorMessage = 'Error al reservar libro.';
        if (error.error.message === "El usuario ya tiene una reserva activa.") {
          errorMessage = "No se puede realizar la reserva. El usuario ya tiene una reserva activa.";
        }
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 3000 });
        console.error('Error al reservar libro:', error);
      }
    );
  }
  
  eliminarReserva(reservaId: number): void {
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

  devolverLibro(reservaId: number): void {
    this.reservaService.devolverLibro(reservaId).subscribe(
      () => {
        this.libro.ejemplaresDisponibles++;
        this.actualizarContadorEjemplaresDisponibles();
        this.alertService.mostrarMensaje('Libro devuelto correctamente.');
        this.reservas = this.reservas.filter(reserva => reserva.id !== reservaId);
      },
      error => {
        console.error('Error al devolver el libro:', error);
      }
    );
  }

  actualizarContadorEjemplaresDisponibles(): void {
    // Lógica para actualizar el contador en la interfaz de usuario
  }

}
