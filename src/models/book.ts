import * as database from "../database/database.json";

export type Book  = {
    id: number;
    title: string;
    language: 'ar' | 'en';
    pages: number;
    isbn: number;
    authors: number[];
};

export class BookStore {
    index(pageNumber: number, pageSize:number): Book[] {
        const pageStart = pageNumber*pageSize;
        const pageEnd = pageNumber*pageSize + pageSize;
        try {
            const books = database.library.books.slice(pageStart, pageEnd) as Book[];
            return books;
        } catch (error) {
            throw new Error("Could not fetch books");
        }
    }

    find(id: number): Book {
        try {
            const book = database.library.books.find(book => book.id == id);

            if(!book) {
                throw {};
            }

            return book as Book;
        } catch (error) {
            throw new Error("Could not find book");
        }
    }

    create(book: Book): Book {
        try {
            const id = database.library.books.length;
            const newBook: Book = {...book, id: id};
            database.library.books.push(newBook); 

            return newBook;
        } catch (error) {
            throw new Error("Could not add book");
        }
    }

    update(id: number, book: Book): Book {
        try {
            const i = database.library.books.findIndex(book => book.id == id);
            const updatedBook = {...database.library.books[i], ...book};
            database.library.books[i] = updatedBook;
            
            return updatedBook;
        } catch (error) {
            throw new Error("Could not update book");
        }
    }

    delete(id: number): Book {
        try {
            const i = database.library.books.findIndex(book => book.id == id);
            const deletedBooks = database.library.books.splice(i, 1);

            return deletedBooks[0] as Book;
        } catch (error) {
            throw new Error("Could not delete book");
        }
    }
}

