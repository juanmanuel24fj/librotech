import { Component, OnInit } from '@angular/core';
import { Libro } from '../model/libro.model';
import { LibroService } from '../services/libro.service';
import { ReservaService } from '../services/reserva.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html'
})
export class LibrosComponent implements OnInit {

  libros: Libro[] = [];
  nombreBusqueda: string = '';
  libroBuscado: Libro | undefined;
  mostrarFormulario: boolean = false;
  nuevoLibro: Libro = new Libro(0, '', '', 0, '');
  selectedFile!: File;
Array: any;

  constructor(
    private libroService: LibroService,
    private reservaService: ReservaService,
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

  buscarLibros(): void {
    console.log('Buscando libros con el nombre o autor:', this.nombreBusqueda);

    if (this.nombreBusqueda) {
      this.libroService.buscarLibrosPorTitulo(this.nombreBusqueda).subscribe(
        (respuestaTitulo: any) => {
          const librosTitulo = Array.isArray(respuestaTitulo) ? respuestaTitulo : [respuestaTitulo];
          console.log('Libros encontrados por título:', librosTitulo);

          // Ahora solo buscamos por autor si no se encontraron libros por título
          if (librosTitulo.length === 0) {
            this.libroService.buscarLibrosPorAutor(this.nombreBusqueda).subscribe(
              (respuestaAutor: any) => {
                const librosAutor = Array.isArray(respuestaAutor) ? respuestaAutor : [respuestaAutor];
                console.log('Libros encontrados por autor:', librosAutor);

                if (librosAutor.length > 0) {
                  this.libros = librosAutor;
                } else {
                  this.libros = [];
                  console.log('No se encontraron libros con el nombre o autor:', this.nombreBusqueda);
                }
              },
              error => {
                console.error('Error al buscar libros por autor:', error);
              }
            );
          } else {
            this.libros = librosTitulo;
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
    return `http://localhost:8086/api/images/${imagen}`;
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

  agregarLibro(): void {
    this.libroService.crearLibro(this.nuevoLibro).subscribe(
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