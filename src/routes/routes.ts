import express from "express";
import author_routes from "./handlers/authors";
import book_routes from "./handlers/books";
import borrower_routes from "./handlers/borrowers";

const routes = express.Router();

routes.use('/authors', author_routes);
routes.use('/books', book_routes);
routes.use('/borrowers', borrower_routes);

export default routes;

