import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {BooksService} from './books.service';
import { Books } from './book.entity';
@Controller('/books')
export class BooksController {

    constructor(private booksService: BooksService){


    }

    @Get('/getAllBooks')
    getAllBooks(){
        return this.booksService.getAllBooks();
    }

    @Post('/createNewBooks')
    async createBook(@Body() newBooks:Books){

        return await this.booksService.createBook(newBooks)

    }

    @Get('/getBook/:id_libro')
    async getBooksId(@Param('id_libro') id_libro: string){
        return await this.booksService.getBooksId(id_libro);

    }

    @Put('/updateBook/:id_libro')
    async updateBookId(@Param('id_libro') id_libro:string, @Body() book:Books){
    
        if (!book) {
            throw new BadRequestException('El objeto de libro es requerido');
        }
    
        return await this.booksService.updateBookId(id_libro, book);
    }

    @Delete('/deleteBook/:id_libro')
    
    async deleteBook(@Param('id_libro') id_libro: string){

        return await this.booksService.deleteBook(id_libro);

    }



}
