export interface Repartidor{
    id:string,
    dni:string, 
    nombre:string | null,
    fecha_nacimiento:string ,
    capacidad_pizzas:number, 
    pais_origen:string, 
    unidadPropia:boolean, 
    url_foto_pais:string|null
}
