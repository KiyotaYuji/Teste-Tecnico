import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';

import { type CreditCard } from '../types/Card';
import { formatCardNumber, formatCPF, formatDate } from '../utils/Formatters';
import { CreditCardFront } from './CreditCardVisual/CreditCardFront';
import { CreditCardBack } from './CreditCardVisual/CreditCardBack';

interface CreditCardFormProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (cardData: Omit<CreditCard, 'id'>) => Promise<void>;
}

export const CreditCardForm = ({ show, onClose, onSubmit }: CreditCardFormProps) => {
    const [currentCard, setCurrentCard] = useState<Partial<CreditCard>>({});
    const [currentStep, setCurrentStep] = useState<'front' | 'back'>('front');
    const [formFlipped, setFormFlipped] = useState(false);
    const [error, setError] = useState<string | null>(null);  // ← NOVO
    const [isSubmitting, setIsSubmitting] = useState(false);  // ← NOVO

    const handleCancel = () => {
        setCurrentCard({});
        setCurrentStep('front');
        setFormFlipped(false);
        setError(null);  // ← NOVO
        onClose();
    };

    const handleFrontSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);  // ← NOVO
        setCurrentStep('back');
        setFormFlipped(true);
    };

    const handleBackClick = () => {
        setCurrentStep('front');
        setFormFlipped(false);
        setError(null);  // ← NOVO
    };

    const handleBackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);  // ← NOVO
        setIsSubmitting(true);  // ← NOVO

        const newCard = {
            holderName: currentCard.holderName || '',
            cardNumber: currentCard.cardNumber || '',
            birthDate: currentCard.birthDate || '',
            cpf: currentCard.cpf || '',
        };

        try {
            await onSubmit(newCard);
            handleCancel();
        } catch (err) {
            // ← NOVO: Captura o erro e mostra no form
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Erro ao cadastrar cartão. Verifique os dados.');
            }
        } finally {
            setIsSubmitting(false);  // ← NOVO
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
                    onClick={handleCancel}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {currentStep === 'front' ? 'Dados do Cartão' : 'Dados Pessoais'}
                            </h2>
                            <button
                                onClick={handleCancel}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                                disabled={isSubmitting}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* ← NOVO: Mensagem de erro dentro do modal */}
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-red-800 font-medium">Erro ao cadastrar</p>
                                    <p className="text-sm text-red-600 mt-1">{error}</p>
                                </div>
                            </div>
                        )}

                        <div className="mb-6 flex justify-center" style={{ perspective: '1000px' }}>
                            <motion.div
                                animate={{ rotateY: formFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6, type: 'spring' }}
                                style={{ transformStyle: 'preserve-3d' }}
                                className="scale-75"
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
                                        disabled={isSubmitting}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Formato: dia/mês/ano
                                    </p>
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
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleBackClick}
                                        className="flex-1 border border-slate-300 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-50 transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        ← Voltar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!currentCard.birthDate || !currentCard.cpf || isSubmitting}
                                        className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                                Salvando...
                                            </>
                                        ) : (
                                            'Concluir ✓'
                                        )}
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