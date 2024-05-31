import { Component } from '@angular/core';
import { TablaActoresComponent } from '../../../components/tabla-actores/tabla-actores.component';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [TablaActoresComponent],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {

}
