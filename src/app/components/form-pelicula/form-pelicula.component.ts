import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pelicula } from '../../core/models/pelicula.model';
import { PeliculasService } from '../../core/services/peliculas.service';
import { Actor } from '../../core/models/actor.model';
import {  NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-pelicula',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-pelicula.component.html',
  styleUrl: './form-pelicula.component.css'
})
export class FormPeliculaComponent {
  @Input() pelicula!:Pelicula;
  @Input() actor!:Actor;
  @Output() tareaRealizada = new EventEmitter<any>();

  tipoForm ="Agregar pelicula"
  peliculasSvc = inject(PeliculasService)
  imagen :any;
  spinner = inject(NgxSpinnerService)
  toast= inject(ToastrService)

  ngOnInit():void{
    if(this.pelicula){
      this.tipoForm = "Modificar pelicula"
      this.actor = this.pelicula.actor
      this.form.patchValue({
        nombre: this.pelicula.Nombre,
        cant_publico: this.pelicula.cant_publico?.toString(),
        fecha: this.pelicula.fecha_estreno,
        nombreActor: this.pelicula.actor?.nombre,
        genero: this.pelicula.tipo,
        //imagen:this.pelicula.src_foto
      });}
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.controls.nombreActor.setValue(this.actor?.nombre, { emitEvent: false });
}

  form= new FormGroup ({
    nombre: new FormControl('',[Validators.required]),
    nombreActor: new FormControl('',[Validators.required]),
    cant_publico: new FormControl('',[Validators.required,Validators.max(200),Validators.min(0)]),
    fecha: new FormControl('',[Validators.required]),
    genero: new FormControl('',[Validators.required]),
    imagen: new FormControl('',this.pelicula?[Validators.required]:undefined),
  })

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file
    }
  }


  submit(){
    this.spinner.show()
    const nuevaPelicula:Pelicula ={
      //@ts-ignore
      cant_publico:this.form.value.cant_publico,
      fecha_estreno:this.form.value.fecha as string,
      Nombre:this.form.value.nombre as string,
      //@ts-ignore
      tipo:this.form.value.genero,
    }

    if(this.pelicula){
      nuevaPelicula.src_foto = this.pelicula.src_foto,
      nuevaPelicula.id = this.pelicula.id
      if(this.imagen){
        this.peliculasSvc.updateData(nuevaPelicula,this.imagen).then(()=>{
          this.toast.success("pelicula modificada con exito","Modificacion pelicula")
          this.spinner.hide()})
      }else{
        this.peliculasSvc.updateData(nuevaPelicula).then(()=>{
          this.toast.success("pelicula modificada con exito","Modificacion pelicula")
          this.spinner.hide()})
      }
    }else{
      nuevaPelicula.actor=this.actor
      this.peliculasSvc.newData(nuevaPelicula,this.imagen).then(()=>{
        this.toast.success("pelicula agregada con exito","Alta pelicula")
        this.spinner.hide()
      })
    }
    
    this.tareaRealizada.emit()
    this.form.reset()
  }

}
