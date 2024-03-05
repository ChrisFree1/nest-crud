export enum StatusBooks{
    Activo = 'Activo',
    Reservado = 'Reservado',
    Devuelto = 'Devuelto',
}


export class Books{
    nombre_libro: string
    autor_libro: string
    fecha_publicacion: string
    statusBook: StatusBooks.Activo
}