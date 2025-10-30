import { Request, Response } from 'express';
import { CardDAO } from '../dao/CardDAO';
import { isValidCPF } from '../validators/CPFValidator';
import { isValidDate } from '../validators/DateValidator';
import { isValidCardNumber } from '../validators/CardValidator';
import { CreateCardDTO } from '../model/CreditCard';

export class CardController {
    private cardDAO: CardDAO;

    constructor() {
        this.cardDAO = new CardDAO();
    }

    // GET /api/cards - Lista todos os cartões
    listCards = async (req: Request, res: Response): Promise<void> => {
        try {
            const cards = await this.cardDAO.findAll();
            res.json(cards);
        } catch (error) {
            console.error('Erro ao listar cartões:', error);
            res.status(500).json({ error: 'Erro ao listar cartões' });
        }
    };

    // GET /api/cards/:id - Busca um cartão por ID
    getCard = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const card = await this.cardDAO.findById(id);

            if (!card) {
                res.status(404).json({ error: 'Cartão não encontrado' });
                return;
            }

            res.json(card);
        } catch (error) {
            console.error('Erro ao buscar cartão:', error);
            res.status(500).json({ error: 'Erro ao buscar cartão' });
        }
    };

    // POST /api/cards - Cria um novo cartão
    createCard = async (req: Request, res: Response): Promise<void> => {
        try {
            const { holderName, cardNumber, birthDate, cpf }: CreateCardDTO = req.body;

            const errors: string[] = [];

            // Validação do nome
            if (!holderName || holderName.trim().length < 3) {
                errors.push('Nome do titular deve ter pelo menos 3 caracteres');
            } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(holderName.trim())) {  // ← NOVO
                errors.push('Nome do titular deve conter apenas letras');
            }

            // Validação do cartão
            if (!cardNumber) {
                errors.push('Número do cartão é obrigatório');
            } else if (!isValidCardNumber(cardNumber)) {
                errors.push('Número do cartão inválido');  // ← SIMPLIFICADO
            }

            // Validação da data
            if (!birthDate) {
                errors.push('Data de nascimento é obrigatória');
            } else if (!isValidDate(birthDate)) {
                errors.push('Data de nascimento inválida ou menor de 18 anos');  // ← SIMPLIFICADO
            }

            // Validação do CPF
            if (!cpf) {
                errors.push('CPF é obrigatório');
            } else if (!isValidCPF(cpf)) {
                errors.push('CPF inválido');  // ← SIMPLIFICADO
            }

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const newCard = await this.cardDAO.create({
                holderName: holderName.trim(),
                cardNumber,
                birthDate,
                cpf,
            });

            res.status(201).json(newCard);
        } catch (error) {
            console.error('Erro ao criar cartão:', error);
            res.status(500).json({ error: 'Erro ao criar cartão' });
        }
    };


    // PUT /api/cards/:id - Atualiza um cartão (opcional)
    updateCard = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updateData: Partial<CreateCardDTO> = req.body;

            // Validações se os campos forem fornecidos
            const errors: string[] = [];

            if (updateData.holderName && updateData.holderName.trim().length < 3) {
                errors.push('Nome do titular deve ter pelo menos 3 caracteres');
            }

            if (updateData.cardNumber && !isValidCardNumber(updateData.cardNumber)) {
                errors.push('Número do cartão inválido');
            }

            if (updateData.birthDate && !isValidDate(updateData.birthDate)) {
                errors.push('Data de nascimento inválida');
            }

            if (updateData.cpf && !isValidCPF(updateData.cpf)) {
                errors.push('CPF inválido');
            }

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const updatedCard = await this.cardDAO.update(id, updateData);

            if (!updatedCard) {
                res.status(404).json({ error: 'Cartão não encontrado' });
                return;
            }

            res.json(updatedCard);
        } catch (error) {
            console.error('Erro ao atualizar cartão:', error);
            res.status(500).json({ error: 'Erro ao atualizar cartão' });
        }
    };

    // DELETE /api/cards/:id - Deleta um cartão
    deleteCard = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const deleted = await this.cardDAO.delete(id);

            if (!deleted) {
                res.status(404).json({ error: 'Cartão não encontrado' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar cartão:', error);
            res.status(500).json({ error: 'Erro ao deletar cartão' });
        }
    };
}