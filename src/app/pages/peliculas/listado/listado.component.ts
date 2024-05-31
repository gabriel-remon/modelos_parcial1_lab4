import { Component } from '@angular/core';
import { TablaPeliculaComponent } from '../../../components/tabla-pelicula/tabla-pelicula.component';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [TablaPeliculaComponent],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

}
