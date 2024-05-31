import { Component, inject } from '@angular/core';
import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  utilSvc = inject(UtilsService)

  irArriba(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
