import express from "express";
import validateBook from "../../middleware/validate-book";
import { BookStore } from "../../models/book";

const store = new BookStore();
const book_routes = express.Router();


const index = async (_req: express.Request, _res: express.Response) => {
    const pageNumber = parseInt(_req.query.pageNumber as string) - 1 || 0;
    const pageSize = parseInt(_req.query.pageSize as string) || 5;
    try {
        const books = store.index(pageNumber, pageSize);
        _res.json(books);
    } catch (error: any) {
        _res.status(404).json({ message: error.message });
    }
};

const find = async (_req: express.Request, _res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const book = store.find(id);
        _res.json(book);
    } catch (error: any) {
        _res.status(404).json({ message: error.message });
    }
};

const create = async (_req: express.Request, _res: express.Response) => {
    try {
        const book = _req.body;
        const newBook = store.create(book);
        _res.json(newBook);
    } catch (error: any) {
        _res.status(400).json({ message: error.message });        
    }
};
const update = async (_req: express.Request, _res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const book = _req.body;
        const updatedBook = store.update(id, book);
        _res.json(updatedBook);
    } catch (error: any) {
        _res.status(400).json({ message: error.message });        
    }
};
const remove = async (_req: express.Request, _res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const deletedBook = store.delete(id);
        _res.json(deletedBook);
    } catch (error: any) {
        _res.status(400).json({ message: error.message });        
    }
};

book_routes.get('/', index);
book_routes.post('/', validateBook, create);
book_routes.get('/:id', find);
book_routes.put('/:id', validateBook, update);
book_routes.delete('/:id', remove);

export default book_routes;