import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../core/services/peliculas.service';
import { Pizza } from '../../core/models/pizzas.model';
import { PizzasServices } from '../../core/services/pizzas.service';

@Component({
  selector: 'app-tabla-pizzas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-pizzas.component.html',
  styleUrl: './tabla-pizzas.component.css'
})
export class TablaPizzasComponent {

  @Output() peliculaElegida = new EventEmitter<Pizza>();

  @Input()pizzas! : Pizza[] |[];

  pizzasSvc = inject(PizzasServices)

  ngOnInit(): void {
    if(!this.pizzas){
      this.pizzasSvc.getData(pizzas =>{
        this.pizzas = pizzas
      })
    }
  }
  

  seleccionarPelicula(pizza:Pizza){

    this.peliculaElegida.emit(pizza)
  }

}
