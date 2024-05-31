import { Component, inject } from '@angular/core';
import { TablaActoresComponent } from '../../../components/tabla-actores/tabla-actores.component';
import { Actor } from '../../../core/models/actor.model';
import { CommonModule } from '@angular/common';
import { TablaPeliculaComponent } from '../../../components/tabla-pelicula/tabla-pelicula.component';
import { Pelicula } from '../../../core/models/pelicula.model';
import { PeliculasService } from '../../../core/services/peliculas.service';
import { DetallePaisComponent } from '../../../components/detalle-pais/detalle-pais.component';
import { DetalleActorComponent } from '../../../components/detalle-actor/detalle-actor.component';

@Component({
  selector: 'app-actorpelicula',
  standalone: true,
  imports: [TablaActoresComponent,
    CommonModule,TablaPeliculaComponent,
    DetallePaisComponent,
    DetalleActorComponent],
  templateUrl: './actorpelicula.component.html',
  styleUrl: './actorpelicula.component.css'
})
export class ActorpeliculaComponent {

  actorSelec!:Actor;
  peliculas!:Pelicula[];

  peliculasSvc = inject(PeliculasService)
  paisSeleccionado:any

  actor(actor:Actor){
    console.log(actor)
    this.actorSelec = actor
    this.peliculasSvc.getDataForIdActor(actor.id,peliculas=>{
      console.log(peliculas)
      this.peliculas= peliculas
      this.paisSeleccionado= {
        nombre: actor.pais_origen,
        foto:actor.url_pais
      }
    })
  }
}
