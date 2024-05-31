import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


export const auth_routes: Routes = [

    {
        path: 'login',
        component:LoginComponent
        
    },
    {
        path: 'registro',
        component:RegisterComponent
    }
];
