import { TransactionTypes } from "../../../../constants/transaction-type.enum";

export interface Transactions {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: TransactionTypes;
    deletando: boolean;
}