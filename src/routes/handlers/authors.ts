import express from "express";
import { AuthorStore } from "../../models/author";

const store = new AuthorStore();
const author_routes = express.Router();


const index = async (_req: express.Request, _res: express.Response) => {
    try {
        const authors = store.index();
        _res.json(authors);
    } catch (error: any) {
        _res.status(404).json({ message: error.message });
    }
};

const find = async (_req: express.Request, _res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const author = store.find(id);
        _res.json(author);
    } catch (error: any) {
        _res.status(404).json({ message: error.message });
    }
};

const create = async (_req: express.Request, _res: express.Response) => {
    try {
        const author = _req.body;
        const newAuthor = store.create(author);
        _res.json(newAuthor);
    } catch (error: any) {
        _res.status(400).json({ message: error.message });
    }
};
const update = async (_req: express.Request, _res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const author = _req.body;
        const updatedAuthor = store.update(id, author);
        _res.json(updatedAuthor);
    } catch (error: any) {
        _res.status(400).json({ message: error.message });
    }
};
const remove = async (_req: express.Request, _res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const deletedAuthor = store.delete(id);
        _res.json(deletedAuthor);
    } catch (error: any) {
        _res.status(400).json({ message: error.message });
    }
};

author_routes.get('/', index);
author_routes.post('/', create);
author_routes.get('/:id', find);
author_routes.put('/:id', update);
author_routes.delete('/:id', remove);

export default author_routes;