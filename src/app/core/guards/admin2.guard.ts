import { inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthFirebaseService } from '../services/auth.firebase.service';

export const admin2Guard: CanActivateFn = (route, state) => {

    
  const router = inject(Router)
  const uathSvc = inject(AuthFirebaseService)
  const toast = inject(ToastrService)
  //const user =localStorage.getItem('user')

return new Promise((resolve)=>{
  
    if(uathSvc.rol == "admin"){// && user){
      resolve(true)
    }else{
      toast.error("solo los admin pueden ingresar", "Permisos induficientes")
      resolve(false)
    }
  })

};
