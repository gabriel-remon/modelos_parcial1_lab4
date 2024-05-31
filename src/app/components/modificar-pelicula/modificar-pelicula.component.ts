import { Component, Input } from '@angular/core';
import { Pelicula } from '../../core/models/pelicula.model';

@Component({
  selector: 'app-modificar-pelicula',
  standalone: true,
  imports: [],
  templateUrl: './modificar-pelicula.component.html',
  styleUrl: './modificar-pelicula.component.css'
})
export class ModificarPeliculaComponent {
  @Input() pelicula!:Pelicula;

}
