import type { CreditCard } from '../types/Card';

const API_URL = '/api';

export const api = {
    // Lista todos os cartões
    async getCards(): Promise<CreditCard[]> {
        const response = await fetch(`${API_URL}/cards`);
        if (!response.ok) {
            throw new Error('Erro ao buscar cartões');
        }
        return response.json();
    },

    // Cria um novo cartão
    async createCard(card: Omit<CreditCard, 'id'>): Promise<CreditCard> {
        const response = await fetch(`${API_URL}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.errors?.join(', ') || 'Erro ao criar cartão');
        }

        return response.json();
    },

    // Deleta um cartão
    async deleteCard(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/cards/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar cartão');
        }
    },
};