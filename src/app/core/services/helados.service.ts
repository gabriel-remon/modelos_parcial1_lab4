import { Injectable, inject } from '@angular/core';
import { Firestore, query,QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, getFirestore, onSnapshot, orderBy, deleteDoc } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { doc, updateDoc } from '@firebase/firestore';
import { Helado } from '../models/helado.model';

@Injectable({
  providedIn: 'root'
})
export class HeladosServices {

  private tabla = 'helado'

  //firestore = inject(AngularFirestore)
  dbFirebase =inject( Firestore)
  storage = getStorage();
  

  async newData(helado: Helado) {

    return addDoc(collection(getFirestore(),(this.tabla)),helado).then(async res=>{
      helado.id = res.id
      await this.updateData(helado)

      return "Helado guardado con exito"
    }).catch(err=>{
      console.log(err)
    })
  }

 async  updateData(helado:Helado){

    const document = doc(this.dbFirebase,this.tabla,helado.id)
    return await updateDoc(document,{ ...helado})
  }

  getData(funcion:(repartidores:Helado[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef)
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let repartidores :Helado[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let repartidorIn =  doc.data() as Helado
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

  delet(id: any) {
    return deleteDoc(doc(this.dbFirebase, this.tabla, id))
  }
}
