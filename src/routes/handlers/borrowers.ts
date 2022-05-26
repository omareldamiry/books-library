import express from "express";
import { BorrowerStore } from "../../models/borrower";

const store = new BorrowerStore();
const borrower_routes = express.Router();

const index = async (_req: express.Request, _res: express.Response) => {
    try {
        const borrowers = store.index();
        _res.json(borrowers);
    } catch (error: any) {
        _res.status(404).json({ message: error.message });
    }
};

const create = async (_req: express.Request, _res: express.Response) => {
    try {
        const borrower = _req.body;
        const newBorrower = store.create(borrower);
        _res.json(newBorrower);
    } catch (error) {
        
    }
};
const update = async (_req: express.Request, _res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const borrower = _req.body;
        const updatedBorrower = store.update(id, borrower);
        _res.json(updatedBorrower);
    } catch (error) {
        
    }
};
const remove = async (_req: express.Request, _res: express.Response) => {
    try {
        const id = parseInt(_req.params.id);
        const deletedBorrower = store.delete(id);
        _res.json(deletedBorrower);
    } catch (error) {
        
    }
};

borrower_routes.get('/', index);
borrower_routes.post('/', create);
borrower_routes.put('/:id', update);
borrower_routes.delete('/:id', remove);

export default borrower_routes;