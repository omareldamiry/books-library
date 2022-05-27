import express from "express";
import { Book } from "../models/book";

const validateBook = (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
    const book = _req.body as Book;
    const isbnRules = /^[1-9][0-9]{9}$/;
    const isValidIsbn = isbnRules.test(book.isbn.toString());
    const isValidPages = book.pages >= 50;
    const isValidLanguage = book.language == "ar" || book.language == "en";

    if(!isValidIsbn) _res.status(400).json({ message: "Invalid ISBN" });
    if(!isValidPages) _res.status(400).json({ message: "Invalid number of pages" });
    if(!isValidLanguage) _res.status(400).json({ message: "Invalid language" });

    next();
};

export default validateBook;