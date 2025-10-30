export function isValidDate(dateStr: string): boolean {
    // Verifica formato DD/MM/AAAA
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(regex);

    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Verifica se a data é válida
    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return false;
    }

    // Verifica se não é no futuro
    if (date > new Date()) return false;

    // Verifica idade mínima (18 anos)
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    if (date > eighteenYearsAgo) return false;

    // Verifica idade máxima (120 anos)
    const oneHundredTwentyYearsAgo = new Date();
    oneHundredTwentyYearsAgo.setFullYear(oneHundredTwentyYearsAgo.getFullYear() - 120);

    return date >= oneHundredTwentyYearsAgo;


}