import { Actor } from "./actor.model"

export interface Pelicula{
    id:string,
    Nombre:string | null,
    tipo: "terror"|"comedia"|"amor"|"otros"| null,
    fecha_estreno:string | null,
    cant_publico:number | null,
    src_foto:string| null
    actor:Actor
}
