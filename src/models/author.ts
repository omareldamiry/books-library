import * as database from "../database/database.json";
import fs from "fs/promises";

export type Author = {
    id: number;
    firstname: string;
    lastname: string;
};

export class AuthorStore {
    index(): Author[] {
        try {
            const authors = database.library.authors as Author[];
            return authors;
        } catch (error) {
            throw new Error("Could not fetch authors");
        }
    }

    find(id: number): Author {
        try {
            const author = database.library.authors.find(author => author.id == id);

            if (!author) {
                throw {};
            }

            return author as Author;
        } catch (error) {
            throw new Error("Could not find author");
        }
    }

    async create(author: Author): Promise<Author> {
        try {
            const id = database.library.authors.length;
            const newAuthor = { ...author, id: id };
            database.library.authors.push(newAuthor);

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));;

            return newAuthor;
        } catch (error) {
            throw new Error("Could not create author");
        }
    }

    async update(id: number, author: Author): Promise<Author> {
        try {
            const index = database.library.authors.findIndex(author => author.id == id);
            const updatedAuthor = { ...database.library.authors[index], ...author };
            database.library.authors[index] = updatedAuthor;

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));

            return updatedAuthor;
        } catch (error) {
            throw new Error("Could not update author");
        }
    }

    async delete(id: number): Promise<Author> {
        try {
            const index = database.library.authors.findIndex(author => author.id == id);
            const author_books = database.library.books.filter(book => book.authors.includes(id));

            if (author_books.length != 0) throw {};

            const deletedAuthor = database.library.authors.splice(index, 1);

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));

            return deletedAuthor[0] as Author;
        } catch (error) {
            throw new Error("Could not delete author");
        }
    }
}