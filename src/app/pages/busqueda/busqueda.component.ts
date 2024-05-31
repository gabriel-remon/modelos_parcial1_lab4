import { Component, inject } from '@angular/core';
import { TablaPeliculaComponent } from '../../components/tabla-pelicula/tabla-pelicula.component';
import { DetallePeliculaComponent } from '../../components/detalle-pelicula/detalle-pelicula.component';
import { ModificarPeliculaComponent } from '../../components/modificar-pelicula/modificar-pelicula.component';
import { Pelicula } from '../../core/models/pelicula.model';
import { CommonModule } from '@angular/common';
import { FormPeliculaComponent } from '../../components/form-pelicula/form-pelicula.component';
import { PeliculasService } from '../../core/services/peliculas.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [TablaPeliculaComponent,
    DetallePeliculaComponent,
    ModificarPeliculaComponent,
  CommonModule,
FormPeliculaComponent],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {

  pelicula:Pelicula|null=null;
  peliculasSvc = inject(PeliculasService)


  seleccionarPelicula(pelicula:Pelicula){
    this.pelicula = pelicula
  }

  eliminarPelicula(){

    this.peliculasSvc.delet(this.pelicula?.id as string).then(()=>{
      this.pelicula=null
    })
  }

  limpiarCampos(){
    this.pelicula=null
  }
}
