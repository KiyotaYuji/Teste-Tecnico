import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Nossos tipos, utils e componentes
import { type CreditCard } from '../types/Card';
import { formatCardNumber, formatCPF, formatDate } from '../utils/Formatters';
import { CreditCardFront } from './CreditCardVisual/CreditCardFront';
import { CreditCardBack } from './CreditCardVisual/CreditCardBack';

// 1. Definimos as Props que este componente vai receber do App.tsx
interface CreditCardFormProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (cardData: CreditCard) => void;
}

export const CreditCardForm = ({ show, onClose, onSubmit }: CreditCardFormProps) => {

    // 2. Estados internos do formulário
    const [currentCard, setCurrentCard] = useState<Partial<CreditCard>>({});
    const [currentStep, setCurrentStep] = useState<'front' | 'back'>('front');
    const [formFlipped, setFormFlipped] = useState(false);

    // 3. Handlers (as funções de lógica)
    const handleCancel = () => {
        // Reseta o estado interno antes de fechar
        setCurrentCard({});
        setCurrentStep('front');
        setFormFlipped(false);
        onClose(); // Avisa o App.tsx para fechar
    };

    const handleFrontSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Impede o recarregamento da página
        setCurrentStep('back');
        setFormFlipped(true);
    };

    const handleBackClick = () => {
        setCurrentStep('front');
        setFormFlipped(false);
    };

    const handleBackSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 4. Monta o objeto final do cartão
        const newCard: CreditCard = {
            id: Date.now().toString(),
            holderName: currentCard.holderName || '',
            cardNumber: currentCard.cardNumber || '',
            birthDate: currentCard.birthDate || '',
            cpf: currentCard.cpf || '',
        };

        onSubmit(newCard); // Envia o cartão completo para o App.tsx
        handleCancel(); // Reseta e fecha o formulário
    };

    // 5. O JSX (A parte visual do modal e do formulário)
    // Usamos AnimatePresence para animar a entrada e saída do modal
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
                    onClick={handleCancel} // Fecha ao clicar no fundo
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar no modal
                    >
                        {/* Cabeçalho do Modal */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {currentStep === 'front' ? 'Dados do Cartão' : 'Dados Pessoais'}
                            </h2>
                            <button
                                onClick={handleCancel}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cartão de Preview (que vira) */}
                        <div className="mb-6 flex justify-center" style={{ perspective: '1000px' }}>
                            <motion.div
                                animate={{ rotateY: formFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6, type: 'spring' }}
                                style={{ transformStyle: 'preserve-3d' }}
                                className="scale-75" // Deixa o preview um pouco menor
                            >
                                <div style={{ backfaceVisibility: 'hidden' }}>
                                    <CreditCardFront card={currentCard} />
                                </div>
                                <div
                                    className="absolute top-0 left-0"
                                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                >
                                    <CreditCardBack card={currentCard} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Etapa 1: Frente do Cartão */}
                        {currentStep === 'front' && (
                            <form onSubmit={handleFrontSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Nome do Titular
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={currentCard.holderName || ''}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-slate-800"
                                        placeholder="Seu nome como está no cartão"
                                        onChange={(e) => setCurrentCard(prev => ({ ...prev, holderName: e.target.value }))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Número do Cartão
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={currentCard.cardNumber || ''}
                                        maxLength={19}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono outline-none text-slate-800"
                                        placeholder="0000 0000 0000 0000"
                                        onChange={(e) => {
                                            const formatted = formatCardNumber(e.target.value);
                                            setCurrentCard(prev => ({ ...prev, cardNumber: formatted }));
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!currentCard.holderName || !currentCard.cardNumber}
                                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-3 rounded-lg transition-colors"
                                >
                                    Próximo →
                                </button>
                            </form>
                        )}

                        {/* Etapa 2: Verso do Cartão */}
                        {currentStep === 'back' && (
                            <form onSubmit={handleBackSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Data de Nascimento
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={currentCard.birthDate || ''}
                                        maxLength={10}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono outline-none text-slate-800"
                                        placeholder="DD/MM/AAAA"
                                        onChange={(e) => {
                                            const formatted = formatDate(e.target.value);
                                            setCurrentCard(prev => ({ ...prev, birthDate: formatted }));
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        CPF
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={currentCard.cpf || ''}
                                        maxLength={14}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono outline-none text-slate-800"
                                        placeholder="000.000.000-00"
                                        onChange={(e) => {
                                            const formatted = formatCPF(e.target.value);
                                            setCurrentCard(prev => ({ ...prev, cpf: formatted }));
                                        }}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button" // Importante ser type="button" para não submeter o form
                                        onClick={handleBackClick}
                                        className="flex-1 border border-slate-300 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        ← Voltar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!currentCard.birthDate || !currentCard.cpf}
                                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-3 rounded-lg transition-colors"
                                    >
                                        Concluir ✓
                                    </button>
                                </div>
                            </form>
                        )}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};