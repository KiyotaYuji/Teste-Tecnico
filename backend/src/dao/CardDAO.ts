import fs from 'fs/promises';
import path from 'path';
import { CreditCard, CreateCardDTO } from '../model/CreditCard';

export class CardDAO {
    private dataPath: string;

    constructor() {
        this.dataPath = path.join(__dirname, '../data/cards.json');
    }

    // Garante que o arquivo existe
    private async ensureDataFile(): Promise<void> {
        try {
            await fs.access(this.dataPath);
        } catch {
            await fs.mkdir(path.dirname(this.dataPath), { recursive: true });
            await fs.writeFile(this.dataPath, JSON.stringify([]));
        }
    }

    // Lê todos os cartões
    private async readCards(): Promise<CreditCard[]> {
        await this.ensureDataFile();
        const data = await fs.readFile(this.dataPath, 'utf-8');
        return JSON.parse(data);
    }

    // Salva os cartões
    private async writeCards(cards: CreditCard[]): Promise<void> {
        await fs.writeFile(this.dataPath, JSON.stringify(cards, null, 2));
    }

    // CRUD Operations

    // Listar todos os cartões
    async findAll(): Promise<CreditCard[]> {
        return await this.readCards();
    }

    // Buscar cartão por ID
    async findById(id: string): Promise<CreditCard | null> {
        const cards = await this.readCards();
        const card = cards.find(c => c.id === id);
        return card || null;
    }

    // Criar novo cartão
    async create(cardData: CreateCardDTO): Promise<CreditCard> {
        const cards = await this.readCards();

        const newCard: CreditCard = {
            id: Date.now().toString(),
            ...cardData,
            cardNumber: cardData.cardNumber.replace(/\s/g, ''),
            cpf: cardData.cpf.replace(/\D/g, ''),
            createdAt: new Date().toISOString(),
        };

        cards.push(newCard);
        await this.writeCards(cards);

        return newCard;
    }

    // Atualizar cartão (se quiser implementar depois)
    async update(id: string, cardData: Partial<CreateCardDTO>): Promise<CreditCard | null> {
        const cards = await this.readCards();
        const cardIndex = cards.findIndex(c => c.id === id);

        if (cardIndex === -1) {
            return null;
        }

        cards[cardIndex] = {
            ...cards[cardIndex],
            ...cardData,
        };

        await this.writeCards(cards);
        return cards[cardIndex];
    }

    // Deletar cartão
    async delete(id: string): Promise<boolean> {
        const cards = await this.readCards();
        const cardIndex = cards.findIndex(c => c.id === id);

        if (cardIndex === -1) {
            return false;
        }

        const filteredCards = cards.filter(c => c.id !== id);
        await this.writeCards(filteredCards);

        return true;
    }

    // Verificar se cartão existe
    async exists(id: string): Promise<boolean> {
        const card = await this.findById(id);
        return card !== null;
    }
}