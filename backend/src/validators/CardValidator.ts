// Algoritmo de Luhn
export function isValidCardNumber(cardNumber: string): boolean {
    // Remove espaços
    const cleanNumber = cardNumber.replace(/\s/g, '');

    // Verifica se tem apenas números
    if (!/^\d+$/.test(cleanNumber)) return false;

    // Verifica se tem 13-19 dígitos (padrão dos cartões)
    if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;

    // Algoritmo de Luhn
    let sum = 0;
    let isEven = false;

    // Percorre de trás para frente
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber.charAt(i), 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}