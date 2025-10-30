import type {CreditCard} from '../../types/Card';

export const CreditCardBack = ({card}: { card: Partial<CreditCard> }) => {
    return (
        <div className="w-80 h-48 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xl shadow-2xl text-white relative overflow-hidden">
            {/* Tarja magnética */}
            <div className="w-full h-12 bg-black mt-6 shadow-inner"/>

            {/* Faixa de assinatura */}
            <div className="px-5 mt-6">
                <div className="bg-gradient-to-r from-slate-200 to-white h-10 rounded flex items-center px-3 shadow-md">
                    <div className="text-slate-700 text-sm italic font-medium">
                        {card.holderName || 'Assinatura'}
                    </div>
                </div>
            </div>

            {/* Informações pessoais */}
            <div className="px-5 mt-4 space-y-2">
                <div className="flex justify-between text-xs bg-slate-800/50 rounded px-3 py-2">
                    <span className="opacity-70 font-medium">Data de Nascimento:</span>
                    <span className="font-mono text-purple-300">{card.birthDate || '__/__/____'}</span>
                </div>
                <div className="flex justify-between text-xs bg-slate-800/50 rounded px-3 py-2">
                    <span className="opacity-70 font-medium">CPF:</span>
                    <span className="font-mono text-purple-300">{card.cpf || '___.___.___-__'}</span>
                </div>
            </div>

            {/* CVV */}
            <div className="absolute bottom-5 right-6 text-right bg-white px-3 py-2 rounded shadow-lg">
                <div className="text-[10px] text-slate-600 font-semibold uppercase tracking-wide">CVV</div>
                <div className="text-lg font-mono text-slate-800 font-bold">•••</div>
            </div>
        </div>
    );
};