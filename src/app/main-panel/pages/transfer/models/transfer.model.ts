import { TransactionTypes } from "../../../../constants/transaction-type.enum";
import { TipoPessoa } from '../../../../constants/tipo-pessoa.enum';

export interface Transfer {    
    
    id: string;
    agencia: number;
    conta: number;
    tipoPessoa: TipoPessoa;
    nome: string;
    cpf: number;    
    date: string;
    description: string;
    amount: number;
    type: TransactionTypes;
    deletando: boolean;
}