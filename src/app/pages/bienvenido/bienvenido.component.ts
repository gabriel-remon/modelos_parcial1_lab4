import { Component, inject } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AuthFirebaseService } from '../../core/services/auth.firebase.service';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [HeroComponent],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent {
 
}
