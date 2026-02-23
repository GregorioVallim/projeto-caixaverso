import { TransactionTypes } from "../../../../constants/transaction-type.enum";

export interface Transactions {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: TransactionTypes;
}