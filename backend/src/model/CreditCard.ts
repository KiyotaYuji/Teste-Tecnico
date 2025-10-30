export interface CreditCard {
    id: string;
    holderName: string;
    cardNumber: string;
    birthDate: string;
    cpf: string;
    createdAt: string;
}

export type CreateCardDTO = Omit<CreditCard, 'id' | 'createdAt'>;

export type UpdateCardDTO = Partial<CreateCardDTO>;