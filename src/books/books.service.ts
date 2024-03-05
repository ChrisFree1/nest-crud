import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Books, StatusBooks } from './book.entity';
import { DataSnapshot, child, get, push, ref, set, getDatabase, update, remove } from 'firebase/database';
import { firebaseDatabase } from 'src/firebase.config';
import e, { json } from 'express';

@Injectable()
export class BooksService {

    private refDataBase;

    constructor() {
        this.refDataBase = ref(firebaseDatabase, 'books');
    }

    async getAllBooks() {
        const getData: DataSnapshot = await get(this.refDataBase);

        try {
            const booksData: any[] = [];
            getData.forEach((childSnapshot) => {
                booksData.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            return booksData;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener el listado de libros");
        }
    }


    async createBook(books: Books) {
        books.statusBook = StatusBooks.Activo;

        const newBooks = push(this.refDataBase, { refDataBase: books });



        try {

            await set(newBooks, books)

            return { message: 'Libro creado exitosamente', statusCode: HttpStatus.CREATED };
            
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener crear un libros");
        }


    }

    async getBooksId(id_libro: string) {
        const db = ref(getDatabase());
        try {
            const snapshot = await get(child(db, `books/${id_libro}`));
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                throw new Error("No se encontraron datos para el libro especificado");
            }
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener el libro");
        }
    }
    async updateBookId(id_libro: string, book: Books) {
        const db = getDatabase();

        try {
            const bookRef = ref(db, `books/${id_libro}`);
            const snapshot = await get(bookRef);

            if (snapshot.exists()) {
                const updates = {
                    nombre_libro: book.nombre_libro,
                    fecha_publicacion: book.fecha_publicacion,
                    autor_libro: book.autor_libro,
                };

                if (book.statusBook !== undefined) {
                    updates['statusBook'] = book.statusBook;
                }

                await update(bookRef, updates);

                return { message: 'Actualización exitosa', statusCode: HttpStatus.OK };

            } else {
                throw new HttpException('El libro no existe', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            console.error(error);
            throw new HttpException('No se pudo actualizar el libro', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async deleteBook(id_libro: string) {
        const db = getDatabase()

        try {

            const bookRef = ref(db, `books/${id_libro}`);

            if (bookRef) {

                await remove(bookRef)

                return { message: 'Libro Eliminado exitosamente', statusCode: HttpStatus.OK }

            } else {

                throw new HttpException('El libro no existe', HttpStatus.NOT_FOUND);

            }

        } catch (error) {

            console.error(error);

            throw new HttpException('No se pudo eliminar el libro', HttpStatus.INTERNAL_SERVER_ERROR);



        }

    }

}
