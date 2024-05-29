export class Libro {
  id: number;
  titulo: string;
  autor: string;
  ejemplaresDisponibles: number;
  imagen: string; 

  constructor(id: number, titulo: string, autor: string, ejemplaresDisponibles: number, imagen: string) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.ejemplaresDisponibles = ejemplaresDisponibles;
    this.imagen=imagen;
  }
}
