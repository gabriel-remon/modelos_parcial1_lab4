import { Injectable, inject } from '@angular/core';
import { Firestore, query,QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, getFirestore, onSnapshot, orderBy } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { doc, updateDoc } from '@firebase/firestore';
import { Actor } from '../models/actor.model';

@Injectable({
  providedIn: 'root'
})
export class ActoresServices {

  private tabla = 'actores'

  //firestore = inject(AngularFirestore)
  dbFirebase =inject( Firestore)
  storage = getStorage();
  
 


  async newData(actor: Actor) {

    console.log(actor)
    return addDoc(collection(getFirestore(),(this.tabla)),actor).then(async res=>{
      actor.id = res.id
      await this.updateData(actor)

      return "Actor guardado con exito"
    }).catch(err=>{
      console.log(err)
    })
  }

  async guardarFoto(foto:any, path:string) {
    let storageRef = ref(this.storage,path);
    await uploadBytes(storageRef, foto)
    return await getDownloadURL(storageRef)
  }

 async  updateData(actor:Actor){

    const document = doc(this.dbFirebase,this.tabla,actor.id)
    return await updateDoc(document,{ ...actor})
  }

  getData(funcion:(actores:Actor[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.tabla)
    const q = query(mensajeRef,orderBy('fecha_nacimiento'))
    
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let actores :Actor[] =[];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let actorIn =  doc.data() as Actor
          actores.push( actorIn)
        })
        funcion(actores)
        finaly?finaly():""
      })
    }catch(error){
      finaly?finaly():""
      return error
    }
  }
}
