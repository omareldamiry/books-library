import * as database from "../database/database.json";

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

            if(!author) {
                throw {};
            }

            return author as Author;
        } catch (error) {
            throw new Error("Could not find author");
        }
    }

    create(author: Author): Author {
        try {
            const id = database.library.authors.length;
            const newAuthor = {...author, id: id};
            database.library.authors.push(newAuthor);

            return newAuthor;
        } catch (error) {
            throw new Error("Could not create author");
        }
    }
    update(id: number, author: Author): Author {
        try {
            const index = database.library.authors.findIndex(author => author.id == id);
            const updatedAuthor = {...database.library.authors[index], ...author};
            database.library.authors[index] = updatedAuthor;
            
            return updatedAuthor;
        } catch (error) {
            throw new Error("Could not update author");
        }
    }
    delete(id: number): Author {
        try {
            const index = database.library.authors.findIndex(author => author.id == id);
            const author_books = database.library.books.filter(book => book.authors.includes(id));
            
            if(author_books.length != 0) throw {};

            const deletedAuthor = database.library.authors.splice(index, 1);

            return deletedAuthor[0] as Author;
        } catch (error) {
            throw new Error("Could not delete author");
        }
    }
}