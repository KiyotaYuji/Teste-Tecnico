import { render, screen } from '@testing-library/react';
import { CreditCardFront } from '../CreditCardFront';
import type { CreditCard } from '../../../types/Card';

describe('CreditCardFront', () => {
    const mockCard: Partial<CreditCard> = {
        holderName: 'João Silva',
        cardNumber: '1234 5678 9012 3456',
    };

    it('deve renderizar o cartão com os dados fornecidos', () => {
        render(<CreditCardFront card={mockCard} />);

        expect(screen.getByText('João Silva')).toBeInTheDocument();
        expect(screen.getByText('1234 5678 9012 3456')).toBeInTheDocument();
    });

    it('deve exibir placeholders quando não há dados', () => {
        render(<CreditCardFront card={{}} />);

        expect(screen.getByText('SEU NOME AQUI')).toBeInTheDocument();
        expect(screen.getByText('•••• •••• •••• ••••')).toBeInTheDocument();
    });

    it('deve exibir a validade padrão', () => {
        render(<CreditCardFront card={mockCard} />);

        expect(screen.getByText('12/28')).toBeInTheDocument();
    });

    it('deve renderizar o label "Nome do Titular"', () => {
        render(<CreditCardFront card={mockCard} />);

        expect(screen.getByText('Nome do Titular')).toBeInTheDocument();
    });

    it('deve renderizar o label "Validade"', () => {
        render(<CreditCardFront card={mockCard} />);

        expect(screen.getByText('Validade')).toBeInTheDocument();
    });
});