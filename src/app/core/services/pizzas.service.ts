import { Injectable, inject } from '@angular/core';
import { Firestore, query,QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, getFirestore, onSnapshot, orderBy } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { doc, updateDoc } from '@firebase/firestore';
import { Pizza } from '../models/pizzas.model';

@Injectable({
  providedIn: 'root'
})
export class PizzasServices {

  private tabla = 'pizza'

  //firestore = inject(AngularFirestore)
  dbFirebase =inject( Firestore)
  storage = getStorage();
  

  async newData(pizza: Pizza) {

    return addDoc(collection(getFirestore(),(this.tabla)),pizza).then(async res=>{
      pizza.id = res.id
      await this.updateData(pizza)

      return "Pizza guardado con exito"
    }).catch(err=>{
      console.log(err)
    })
  }

 async  updateData(pizza:Pizza){

    const document = doc(this.dbFirebase,this.tabla,pizza.id)
    return await updateDoc(document,{ ...pizza})
  }

  getData(funcion:(repartidores:Pizza[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef)
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let repartidores :Pizza[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let repartidorIn =  doc.data() as Pizza
          repartidores.push( repartidorIn)
        })
        funcion(repartidores)
        finaly?finaly():""
      })
    }catch(error){
      finaly?finaly():""
      return error
    }
  }
}
