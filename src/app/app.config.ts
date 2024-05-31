import { ApplicationConfig } from '@angular/core';
//importaciones router 
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

//importaciones firebase
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

//importaciones toastr
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//importaciones http
import { provideHttpClient, withFetch } from '@angular/common/http';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    // integracion toastr
    provideAnimationsAsync(),
    provideToastr({timeOut:4000,preventDuplicates:true}),

    //integracion firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), 
    provideStorage(() => getStorage(getApp(),"gs://parcial1-lab4.appspot.com")),

    //integracion solicitdes http
    provideHttpClient(withFetch()), 
   
  ]
};
