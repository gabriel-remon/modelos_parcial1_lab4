import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Actor } from '../../core/models/actor.model';
import { CommonModule } from '@angular/common';
import { ActoresServices } from '../../core/services/actores.service';

@Component({
  selector: 'app-tabla-actores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-actores.component.html',
  styleUrl: './tabla-actores.component.css'
})
export class TablaActoresComponent {
  @Output() actorElegido = new EventEmitter<Actor>();

  /*actores : Actor[] =[
    {
      id:"sdass",
      fecha_nacimiento: "20/2/2022",
      nombre:"pepe films",
      pais_origen:"brasil"
    },
    {
      id:"sdass",
      fecha_nacimiento: "20/2/2022",
      nombre:"pepe films",
      pais_origen:"brasil"
    },
    {
      id:"sdass",
      fecha_nacimiento: "20/2/2022",
      nombre:"pepe films",
      pais_origen:"brasil"
    },
    {
      id:"sdass",
      fecha_nacimiento: "20/2/2022",
      nombre:"pepe films",
      pais_origen:"brasil"
    },
    {
      id:"sdass",
      fecha_nacimiento: "20/2/2022",
      nombre:"pepe films",
      pais_origen:"brasil"
    },
    {
      id:"sdass",
      fecha_nacimiento: "20/2/2022",
      nombre:"pepe films",
      pais_origen:"brasil"
    },

  ]*/

  @Input()actores! : Actor[];

  actoressSvc = inject(ActoresServices)

  ngOnInit(): void {
    if(!this.actores){
      this.actoressSvc.getData(actores =>{
        this.actores = actores
      })
    }
  }

  seleccionarPelicula(actor:Actor){
    this.actorElegido.emit(actor)
  }
}
