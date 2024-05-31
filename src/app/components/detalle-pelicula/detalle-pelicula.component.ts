import { Component, Input } from '@angular/core';
import { Pelicula } from '../../core/models/pelicula.model';

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent {
  @Input() pelicula!:Pelicula;

  
}
