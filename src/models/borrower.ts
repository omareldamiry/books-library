import * as database from "../database/database.json";
import fs from "fs/promises";

export type Borrower = {
    id: number;
    firstname: string;
    lastname: string;
    books: number[];
};

export class BorrowerStore {
    index(): Borrower[] {
        try {
            const borrowers = database.library.borrowers as Borrower[];

            return borrowers;
        } catch (error) {
            throw new Error("Could not fetch borrowers");
        }
    }

    find(id: number): Borrower {
        try {
            const borrower = database.library.borrowers.find(borrower => borrower.id == id);

            if (!borrower) {
                throw {};
            }

            return borrower as Borrower;
        } catch (error) {
            throw new Error("Could not find borrower");
        }
    }

    async create(borrower: Borrower): Promise<Borrower> {
        try {
            const id = database.library.borrowers.length;
            const newBorrower: Borrower = { ...borrower, id: id };
            database.library.borrowers.push(newBorrower);

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));

            return newBorrower;
        } catch (error) {
            throw new Error("Could not create borrower");
        }
    }

    async update(id: number, borrower: Borrower): Promise<Borrower> {
        try {
            const index = database.library.borrowers.findIndex(borrower => borrower.id == id);
            const updatedBorrower = { ...database.library.borrowers[index], ...borrower };
            database.library.borrowers[index] = updatedBorrower;

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));

            return updatedBorrower;
        } catch (error) {
            throw new Error("Could not update borrower");
        }
    }

    async delete(id: number): Promise<Borrower> {
        try {
            const index = database.library.borrowers.findIndex(borrower => borrower.id == id);
            const deletedBorrower = database.library.borrowers.splice(index, 1);

            await fs.writeFile("./src/database/database.json", JSON.stringify(database));

            return deletedBorrower[0] as Borrower;
        } catch (error) {
            throw new Error("Could not delete borrower");
        }
    }
}