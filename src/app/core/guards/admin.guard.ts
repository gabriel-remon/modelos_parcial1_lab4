import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { AuthFirebaseService } from '../services/auth.firebase.service';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

  const uathSvc = inject(AuthFirebaseService)
  const toast = inject(ToastrService)


  toast.error("solo los admin pueden ingresar", "Permisos induficientes")

  return new Promise((resolve) => {

    if (uathSvc.rol == "admin") {// && user){
      resolve(true)
    } else {

      toast.error("solo los admin pueden ingresar", "Permisos induficientes")

      resolve(false)
    }

  })

};
