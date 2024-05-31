import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaPizzasComponent } from '../../components/tabla-pizzas/tabla-pizzas.component';
import { FormPizzasComponent } from '../../components/form-pizzas/form-pizzas.component';
import { Pizza } from '../../core/models/pizzas.model';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [TablaPizzasComponent,
    FormPizzasComponent,
    CommonModule
  ],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.css'
})
export class PizzasComponent {

  pizza!:Pizza|undefined

  pizzaSelec(pizza:Pizza){
    this.pizza = pizza
  }

  tareaRealizada(){
    this.pizza=undefined
  }
}
