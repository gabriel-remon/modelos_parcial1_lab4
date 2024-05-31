import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Pelicula } from '../../core/models/pelicula.model';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../core/services/peliculas.service';

@Component({
  selector: 'app-tabla-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-pelicula.component.html',
  styleUrl: './tabla-pelicula.component.css'
})
export class TablaPeliculaComponent {

  @Output() peliculaElegida = new EventEmitter<Pelicula>();
  @Input() tablaMin:boolean=false

  @Input()peliculas! : Pelicula[] |[];

  peliculasSvc = inject(PeliculasService)

  ngOnInit(): void {
    if(!this.peliculas){
      this.peliculasSvc.getData(peliculas =>{
        this.peliculas = peliculas
      })
    }
  }
  

  seleccionarPelicula(pelicula:Pelicula){
    this.peliculaElegida.emit(pelicula)
  }

}
