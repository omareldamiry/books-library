import * as database from "../database/database.json";

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
    create(borrower: Borrower): Borrower {
        try {
            const id = database.library.borrowers.length;
            const newBorrower: Borrower = {...borrower, id: id};
            database.library.borrowers.push(newBorrower);

            return newBorrower;
        } catch (error) {
            throw new Error("Could not create borrower");
        }
    }
    update(id: number, borrower: Borrower): Borrower {
        try {
            const index = database.library.borrowers.findIndex(borrower => borrower.id == id);
            const updatedBorrower = {...database.library.borrowers[index], ...borrower};
            database.library.borrowers[index] = updatedBorrower;
            
            return updatedBorrower;
        } catch (error) {
            throw new Error("Could not update borrower");
        }
    }
    delete(id: number): Borrower {
        try {
            const index = database.library.borrowers.findIndex(borrower => borrower.id == id);
            const deletedBorrower = database.library.borrowers.splice(index, 1);

            return deletedBorrower[0] as Borrower;
        } catch (error) {
            throw new Error("Could not delete borrower");
        }
    }
}