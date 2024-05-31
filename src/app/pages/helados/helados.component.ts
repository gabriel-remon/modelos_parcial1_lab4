import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TablaPizzasComponent } from '../../components/tabla-pizzas/tabla-pizzas.component';
import { FormPizzasComponent } from '../../components/form-pizzas/form-pizzas.component';
import { Helado } from '../../core/models/helado.model';
import { FormHeladosComponent } from '../../components/form-helados/form-helados.component';
import { TablaHeladosComponent } from '../../components/tabla-helados/tabla-helados.component';
import { HeladosServices } from '../../core/services/helados.service';

@Component({
  selector: 'app-helados',
  standalone: true,
  imports: [CommonModule,
    FormHeladosComponent,
    TablaHeladosComponent
  ],
  templateUrl: './helados.component.html',
  styleUrl: './helados.component.css'
})
export class HeladosComponent {
  helado!:Helado|undefined
  heladoSvc = inject(HeladosServices)


  heladoSelec(helado:Helado){
    this.helado = helado
  }

  tareaRealizada(){
    this.helado=undefined
  }
  eliminarHelado(){
    this.heladoSvc.delet(this.helado?.id).finally(()=>{
      this.tareaRealizada()
    })
  }
}
