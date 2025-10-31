import { formatCardNumber, formatCPF, formatDate } from '../Formatters';

describe('Formatters', () => {
    describe('formatCardNumber', () => {
        it('deve formatar número de cartão com espaços a cada 4 dígitos', () => {
            expect(formatCardNumber('1234567890123456')).toBe('1234 5678 9012 3456');
        });

        it('deve remover espaços existentes antes de formatar', () => {
            expect(formatCardNumber('1234 5678 9012 3456')).toBe('1234 5678 9012 3456');
        });

        it('deve limitar a 19 caracteres (16 dígitos + 3 espaços)', () => {
            expect(formatCardNumber('12345678901234567890')).toBe('1234 5678 9012 3456');
        });

        it('deve lidar com entrada vazia', () => {
            expect(formatCardNumber('')).toBe('');
        });

        it('deve formatar números parciais corretamente', () => {
            expect(formatCardNumber('1234')).toBe('1234');
            expect(formatCardNumber('12345')).toBe('1234 5');
            expect(formatCardNumber('123456789')).toBe('1234 5678 9');
        });
    });

    describe('formatCPF', () => {
        it('deve formatar CPF no padrão XXX.XXX.XXX-XX', () => {
            expect(formatCPF('12345678909')).toBe('123.456.789-09');
        });

        it('deve remover caracteres não numéricos', () => {
            expect(formatCPF('123.456.789-09')).toBe('123.456.789-09');
        });

        it('deve limitar a 14 caracteres (11 dígitos + 3 separadores)', () => {
            expect(formatCPF('123456789091234')).toBe('123.456.789-09');
        });

        it('deve lidar com entrada vazia', () => {
            expect(formatCPF('')).toBe('');
        });

        it('deve formatar CPFs parciais corretamente', () => {
            expect(formatCPF('123')).toBe('123');
            expect(formatCPF('1234')).toBe('123.4');
            expect(formatCPF('1234567')).toBe('123.456.7');
            expect(formatCPF('123456789')).toBe('123.456.789');
            expect(formatCPF('12345678901')).toBe('123.456.789-01');
        });
    });

    describe('formatDate', () => {
        it('deve formatar data no padrão DD/MM/AAAA', () => {
            expect(formatDate('25052004')).toBe('25/05/2004');
        });

        it('deve formatar data progressivamente durante digitação', () => {
            expect(formatDate('2')).toBe('2');
            expect(formatDate('25')).toBe('25');
            expect(formatDate('250')).toBe('25/0');
            expect(formatDate('2505')).toBe('25/05');
            expect(formatDate('25052')).toBe('25/05/2');
            expect(formatDate('250520')).toBe('25/05/20');
            expect(formatDate('2505200')).toBe('25/05/200');
            expect(formatDate('25052004')).toBe('25/05/2004');
        });

        it('deve limitar a 10 caracteres (8 dígitos + 2 barras)', () => {
            expect(formatDate('250520041234')).toBe('25/05/2004');
        });

        it('deve remover caracteres não numéricos', () => {
            expect(formatDate('25/05/2004')).toBe('25/05/2004');
        });

        it('deve lidar com entrada vazia', () => {
            expect(formatDate('')).toBe('');
        });
    });
});