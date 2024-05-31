import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Actor } from '../../core/models/actor.model';
import { ActoresServices } from '../../core/services/actores.service';

@Component({
  selector: 'app-form-actor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-actor.component.html',
  styleUrl: './form-actor.component.css'
})
export class FormActorComponent {

  @Input() actor!:Actor;
  @Input() pais:any;
  tipoForm ="Agregar actor"
  peliculasSvc = inject(ActoresServices)
  imagen :any;

  ngOnInit():void{
    if(this.actor){
      this.tipoForm = "Modificar actor"
      this.pais.foto= this.actor.url_pais
      this.pais.nombre = this.actor.pais_origen as string
      this.form.patchValue({
        nombre: this.actor.nombre,
        pais: this.actor.pais_origen,
        nacimiento: this.actor.fecha_nacimiento,
        //imagen:this.pelicula.src_foto
      });
      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.form.controls.pais.setValue(this.pais.nombre , { emitEvent: false });
  }



  form= new FormGroup ({
    nombre: new FormControl('',[Validators.required]),
    pais: new FormControl('',[Validators.required]),
    nacimiento: new FormControl('',[Validators.required])
  })


  submit(){
  
    const nuevoActor:Actor ={
      nombre:this.form.value.nombre as string,
      fecha_nacimiento:this.form.value.nacimiento as string,
      pais_origen:this.form.value.pais as string,
      id:"",
      url_pais:this.pais.foto
    }

    if(this.actor){
      nuevoActor.id = this.actor.id
      this.peliculasSvc.updateData(nuevoActor)
    }else{
      this.peliculasSvc.newData(nuevoActor).then((res)=>{
        console.log(res)
      })
    }

    this.form.reset()
  }

}
