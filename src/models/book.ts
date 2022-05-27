import * as database from "../database/database.json";
import fs from 'fs/promises';

export type Book = {
    id: number;
    title: string;
    language: 'ar' | 'en';
    pages: number;
    isbn: number;
    authors: number[];
};

export class BookStore {
    index(pageNumber: number, pageSize: number): Book[] {
        const pageStart = pageNumber * pageSize;
        const pageEnd = pageNumber * pageSize + pageSize;
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

            if (!book) {
                throw {};
            }

            return book as Book;
        } catch (error) {
            throw new Error("Could not find book");
        }
    }

    async create(book: Book): Promise<Book> {
        try {
            const id = database.library.books.length;
            const newBook: Book = { ...book, id: id };
            database.library.books.push(newBook);

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));

            return newBook;
        } catch (error) {
            throw new Error("Could not add book");
        }
    }

    async update(id: number, book: Book): Promise<Book> {
        try {
            const i = database.library.books.findIndex(book => book.id == id);
            const updatedBook = { ...database.library.books[i], ...book };
            database.library.books[i] = updatedBook;

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));

            return updatedBook;
        } catch (error) {
            throw new Error("Could not update book");
        }
    }

    async delete(id: number): Promise<Book> {
        try {
            const i = database.library.books.findIndex(book => book.id == id);
            const deletedBooks = database.library.books.splice(i, 1);

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));

            return deletedBooks[0] as Book;
        } catch (error) {
            throw new Error("Could not delete book");
        }
    }
}

