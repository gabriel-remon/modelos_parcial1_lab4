import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pizza } from '../../core/models/pizzas.model';
import { PizzasServices } from '../../core/services/pizzas.service';

@Component({
  selector: 'app-form-pizzas',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-pizzas.component.html',
  styleUrl: './form-pizzas.component.css'
})
export class FormPizzasComponent {

  @Input() pizza!:Pizza;
  @Output() tareaRealizada = new EventEmitter<any>();

  tipoForm ="Agregar pizza"
  pizzaSvc = inject(PizzasServices)
  imagen :any;

  form= new FormGroup ({
    nombre: new FormControl('',[Validators.required]),
    ingredientes: new FormControl('',[Validators.required]),
    precio: new FormControl('',[Validators.required,Validators.min(1)]),
    peso: new FormControl('',[Validators.required,Validators.min(500),Validators.max(1000)])
  })


  ngOnInit():void{
    if(this.pizza){
      this.tipoForm = "Modificar pizza"
      this.form.patchValue({
        nombre: this.pizza.nombre,
        precio: this.pizza.precio?.toString(),
        ingredientes: this.pizza.ingredientes,
        peso: this.pizza.peso?.toString()
        //imagen:this.pelicula.src_foto
      });
      
    }
  }


  submit(){
  
    const nuevoActor:Pizza ={
      nombre:this.form.value.nombre  as string,
      ingredientes:this.form.value.ingredientes  as string,
      precio: parseInt(this.form.value.precio as string),
      peso: parseInt(this.form.value.peso as string),
      lista:false,
      id:"",
    }

    if(this.pizza){
      nuevoActor.id = this.pizza.id
      this.pizzaSvc.updateData(nuevoActor as Pizza).then(()=>this.tareaRealizada.emit())
    }else{
      this.pizzaSvc.newData(nuevoActor as Pizza).then(()=>this.tareaRealizada.emit())
    }

    this.form.reset()
  }

}
