import { Injectable, inject } from '@angular/core';
import { Firestore, query, QueryDocumentSnapshot, QuerySnapshot, addDoc, collection, getFirestore, onSnapshot, orderBy, deleteDoc, where } from '@angular/fire/firestore';
import { Pelicula } from '../models/pelicula.model';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import crypto from 'crypto'; // Import the crypto module
import { doc, updateDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private tabla = 'peliculas'

  //firestore = inject(AngularFirestore)
  dbFirebase = inject(Firestore)
  storage = getStorage();




  async newData(pelicula: Pelicula, file: any) {

    //const idPelicula = new Date().getTime().toString()


    addDoc(collection(getFirestore(), (this.tabla)), pelicula).then(async res => {
      pelicula.src_foto = await this.guardarFoto(file, res.id)
      pelicula.id = res.id
      return await this.updateData(pelicula)

    }).catch(err => {
      console.log(err)
    })
  }

  async guardarFoto(foto: any, path: string) {
    let storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, foto)
    return await getDownloadURL(storageRef)
  }

  async updateData(pelicula: Pelicula, foto?: any) {
    if (foto) {
      pelicula.src_foto = await this.guardarFoto(foto, pelicula.id)
    }

    const document = doc(this.dbFirebase, this.tabla, pelicula.id)
    return updateDoc(document, { ...pelicula })
  }

  getData(funcion: (peliculas: Pelicula[]) => void, finaly?: () => void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase, this.tabla)
    const q = query(mensajeRef, orderBy('fecha_estreno'))

    try {
      return onSnapshot(q, (snapshot: QuerySnapshot) => {
        let peliculas: Pelicula[] = [];
        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          let peliculaIn = doc.data() as Pelicula
          peliculas.push(peliculaIn)
        })
        funcion(peliculas)
        finaly ? finaly() : ""
      })
    } catch (error) {
      finaly ? finaly() : ""
      return error
    }
  }


  getDataForIdActor(idAcotr: string, funcion: (peliculas: Pelicula[]) => void, finaly?: () => void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase, this.tabla)
    const q = query(mensajeRef, where('actor.id', '==', idAcotr), orderBy('fecha_estreno'))
    return onSnapshot(q, (snapshot: QuerySnapshot) => {
      let peliculas: Pelicula[] = [];
      snapshot.forEach((doc: QueryDocumentSnapshot) => {
        let peliculaIn = doc.data() as Pelicula
        peliculas.push(peliculaIn)
      })
      console.log(peliculas)
      funcion(peliculas)
      finaly ? finaly() : ""
    }, error => {
      finaly ? finaly() : ""
      console.log(error)
      return error
    })
  }




  delet(id: string) {
    return deleteDoc(doc(this.dbFirebase, this.tabla, id))
  }
}
