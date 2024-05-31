import { Routes } from '@angular/router';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { PizzasComponent } from './pages/pizzas/pizzas.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { admin2Guard } from './core/guards/admin2.guard';
import { HeladosComponent } from './pages/helados/helados.component';

export const routes: Routes = [
    {
        path: 'bienvenido',
        component:BienvenidoComponent
    },
    {
        path: 'busqueda',
        component:BusquedaComponent
    },
    
    {
        path: 'actor',
        loadChildren: ()=> import('./pages/actor/actores.routes').then(m=>m.actores_routes)
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./pages/auth/auth.routes').then(m=>m.auth_routes),
        canActivate:[noAuthGuard]
    },
    {
        path: 'peliculas',
        loadChildren: ()=> import('./pages/peliculas/peliculas.routes').then(m=>m.peliculas_routes)
    },
    {
        path: 'repartidor',
        loadChildren: ()=> import('./pages/repartidor/repartidor.routes').then(m=>m.repartidor_routes),
        canActivate:[authGuard]
    },
    {
        path: 'pizzas',
        component:PizzasComponent,
        canActivate:[authGuard,admin2Guard]
    },
    {
        path: 'helados',
        component:HeladosComponent,
        canActivate:[authGuard,admin2Guard]
    },
    {
        path: '**',
        component:BienvenidoComponent
    },
];
