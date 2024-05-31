import { Component } from '@angular/core';
import { FormPeliculaComponent } from '../../../components/form-pelicula/form-pelicula.component';
import { TablaActoresComponent } from '../../../components/tabla-actores/tabla-actores.component';
import { Actor } from '../../../core/models/actor.model';

@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [FormPeliculaComponent,TablaActoresComponent],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.css'
})
export class AltaComponent {


  actorSelec!:Actor

  actor(actor:Actor){
    this.actorSelec=actor
  }
}
