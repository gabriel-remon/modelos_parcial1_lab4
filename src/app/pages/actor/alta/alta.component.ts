import { Component } from '@angular/core';
import { TablaPaisesComponent } from '../../../components/tabla-paises/tabla-paises.component';
import { FormActorComponent } from '../../../components/form-actor/form-actor.component';

@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [TablaPaisesComponent,FormActorComponent],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.css'
})
export class AltaComponent {
  paisSelec=""

  pais(pais:any){
    this.paisSelec=pais
  }
}
