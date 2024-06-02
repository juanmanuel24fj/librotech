import { Component, OnInit } from '@angular/core';
import { Libro } from '../model/libro.model';
import { LibroService } from '../services/libro.service';
import { ReservaService } from '../services/reserva.service'; // Agrega la importación de ReservaService
import { Router } from '@angular/router';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html'
})
export class LibrosComponent implements OnInit {

  libros: Libro[] = [];
  nombreBusqueda: string = '';
  libroBuscado: Libro | undefined; // Declaración de libroBuscado
  mostrarFormulario: boolean = false;
  nuevoLibro: Libro = new Libro(0, '', '', 0, '');
  selectedFile!: File;

  constructor(
    private libroService: LibroService,
    private reservaService: ReservaService, // Incluye ReservaService en el constructor
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(): void {
    this.libroService.obtenerTodosLosLibros().subscribe(
      libros => {
        console.log('Todos los libros:', libros);
        this.libros = libros;
      },
      error => {
        console.error('Error al obtener todos los libros:', error);
      }
    );
  }

  buscarLibrosPorNombre(): void {
    console.log('Buscando libros con el nombre:', this.nombreBusqueda);
  
    if (this.nombreBusqueda) {
      this.libroService.buscarLibrosPorTitulo(this.nombreBusqueda).subscribe(
        (respuesta: any) => {
          const libros = Array.isArray(respuesta) ? respuesta : [respuesta];
          console.log('Libros encontrados:', libros);
  
          if (libros.length > 0) {
            this.libroBuscado = libros[0];
            console.log('Libro buscado actualizado:', this.libroBuscado);
          } else {
            this.libroBuscado = undefined;
            console.log('No se encontraron libros con el nombre:', this.nombreBusqueda);
          }
        },
        error => {
          console.error('Error al buscar libros por título:', error);
        }
      );
    } else {
      this.libroBuscado = undefined;
      this.obtenerLibros();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getImagenUrl(imagen: string): string {
    return `https://librotech-api.onrender.com/api/libros/images/${imagen}`;
}


  reservarLibro(libro: Libro): void {
    const usuarioId = 1; // Asigna el ID del usuario actualmente logueado
    if (libro.ejemplaresDisponibles > 0) {
      this.reservaService.reservarLibro(libro.id, usuarioId).subscribe(
        () => {
          libro.ejemplaresDisponibles--;
    
        },
        error => {
          console.error('Error al reservar libro:', error);
        }
      );
      this.router.navigate(['/libros'])

    } else {
      alert(`No hay ejemplares disponibles para el libro ${libro.titulo}.`);
    }
  }

  mostrarFormularioAgregar(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormularioAgregar(): void {
    this.mostrarFormulario = false;
  }
  
  volverALibros(): void {
    this.libroBuscado = undefined; // Esto oculta la sección del libro buscado y muestra la lista de libros nuevamente
  }

  agregarLibro(): void {
    const formData: FormData = new FormData();
    formData.append('libro', new Blob([JSON.stringify(this.nuevoLibro)], { type: 'application/json' }));
    formData.append('imagen', this.selectedFile);
  
    this.libroService.crearLibro(formData).subscribe(
      (libro: Libro) => {
        this.libros.push(libro);
        this.cerrarFormularioAgregar();
      },
      error => {
        console.error('Error al agregar libro:', error);
      }
    );
  }
}

