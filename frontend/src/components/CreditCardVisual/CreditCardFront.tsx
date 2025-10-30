import type {CreditCard} from '../../types/Card';

export const CreditCardFront = ({card}: { card: Partial<CreditCard> }) => {
    return (
        <div className="w-80 h-48 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-xl shadow-2xl p-5 text-white relative overflow-hidden">
            {/* Efeitos decorativos de fundo */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"/>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"/>
            </div>

            {/* Brilho sutil */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />

            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="w-12 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded shadow-lg" />
                    <svg className="w-10 h-10 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>

                <div>
                    <div className="text-xl font-mono tracking-wider mb-4 drop-shadow-lg">
                        {card.cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-[10px] opacity-80 mb-1 uppercase tracking-wide">Nome do Titular</div>
                            <div className="text-sm font-semibold uppercase tracking-wide drop-shadow">
                                {card.holderName || 'SEU NOME AQUI'}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] opacity-80 uppercase tracking-wide">Validade</div>
                            <div className="text-sm font-mono">12/28</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};