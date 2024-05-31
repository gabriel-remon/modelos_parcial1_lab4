import { Routes } from '@angular/router';
import { AltaComponent } from './alta/alta.component';
import { ListadoComponent } from './listado/listado.component';
import { ActorpeliculaComponent } from './actorpelicula/actorpelicula.component';


export const actores_routes: Routes = [
    {
        path: 'alta',
        component:AltaComponent
        
    },
    {
        path: 'listado',
        component:ListadoComponent
    },
    {
        path: 'actorpelicula',
        component:ActorpeliculaComponent
    }
];
