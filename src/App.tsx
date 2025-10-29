import { useState } from 'react';
import { type CreditCard } from './types/Card';

// Swiper v12 - SEM importações de CSS!
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Ícones
import { Plus, RotateCw } from 'lucide-react';

// Componentes
import { CreditCardFront } from './components/CreditCardVisual/CreditCardFront';
import { CreditCardBack } from './components/CreditCardVisual/CreditCardBack';
import { CreditCardForm } from './components/CreditCardForm';

export default function App() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

    const handleAddCard = (newCard: CreditCard) => {
        setCards(prevCards => [...prevCards, newCard]);
        setCurrentCarouselIndex(cards.length);
        setShowForm(false);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const toggleCardFlip = () => {
        const currentCardId = cards[currentCarouselIndex]?.id;
        if (!currentCardId) return;

        const newFlippedSet = new Set(flippedCards);

        if (newFlippedSet.has(currentCardId)) {
            newFlippedSet.delete(currentCardId);
        } else {
            newFlippedSet.add(currentCardId);
        }

        setFlippedCards(newFlippedSet);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white p-8 overflow-hidden flex flex-col items-center relative">
            {/* Efeitos de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Título */}
            <div className="relative z-10 mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                    Gestão de Cartões de Crédito
                </h1>
                <p className="text-purple-200 text-center text-lg">
                    Adicione e gerencie seus cartões com estilo
                </p>
            </div>

            {/* Conteúdo Principal */}
            <div className="w-full max-w-6xl flex-grow flex flex-col justify-center items-center relative z-10">

                {/* CARROSSEL */}
                {cards.length > 0 && !showForm && (
                    <div className="w-full space-y-8">
                        <div className="w-full" style={{ height: '400px' }}>
                            <Swiper
                                effect="coverflow"
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView="auto"
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                modules={[EffectCoverflow, Pagination]}
                                className="w-full h-full"
                                onSlideChange={(swiper: SwiperType) => setCurrentCarouselIndex(swiper.activeIndex)}
                                initialSlide={currentCarouselIndex}
                            >
                                {cards.map((card) => {
                                    const isFlipped = flippedCards.has(card.id);

                                    return (
                                        <SwiperSlide key={card.id} style={{ width: '320px' }}>
                                            <div className="flex items-center justify-center h-full py-8">
                                                <div
                                                    className="w-80 h-48 relative cursor-pointer"
                                                    style={{
                                                        transformStyle: 'preserve-3d',
                                                        transition: 'transform 0.6s',
                                                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                                    }}
                                                >
                                                    {/* Frente */}
                                                    <div style={{ backfaceVisibility: 'hidden' }}>
                                                        <CreditCardFront card={card} />
                                                    </div>

                                                    {/* Verso */}
                                                    <div
                                                        className="absolute top-0 left-0"
                                                        style={{
                                                            backfaceVisibility: 'hidden',
                                                            transform: 'rotateY(180deg)'
                                                        }}
                                                    >
                                                        <CreditCardBack card={card} />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        {/* Botão de Virar */}
                        <div className="flex flex-col items-center gap-4">
                            <button
                                onClick={toggleCardFlip}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg flex items-center gap-3 transition-all hover:scale-105 font-semibold"
                            >
                                <RotateCw className="w-5 h-5" />
                                {flippedCards.has(cards[currentCarouselIndex]?.id) ? 'Ver Frente' : 'Ver Verso'}
                            </button>

                            {/* Contador */}
                            <p className="text-purple-300 text-sm">
                                Cartão {currentCarouselIndex + 1} de {cards.length}
                            </p>
                        </div>
                    </div>
                )}

                {/* ESTADO VAZIO */}
                {cards.length === 0 && !showForm && (
                    <div className="flex flex-col items-center gap-6">
                        <div className="opacity-30 hover:opacity-50 transition-opacity">
                            <CreditCardFront card={{}} />
                        </div>
                        <p className="text-purple-300/70 text-center text-sm">
                            Nenhum cartão cadastrado ainda.<br />
                            Clique no botão abaixo para adicionar seu primeiro cartão!
                        </p>
                    </div>
                )}
            </div>

            {/* BOTÃO DE ADICIONAR */}
            {!showForm && (
                <div className="flex justify-center mt-12 relative z-10">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />

                        <button
                            onClick={() => setShowForm(true)}
                            className="relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                        >
                            <Plus className="w-8 h-8" />
                        </button>

                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-white text-slate-800 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                            Adicionar cartão de crédito
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                        </div>
                    </div>
                </div>
            )}

            {/* FORMULÁRIO */}
            <CreditCardForm
                show={showForm}
                onClose={handleCloseForm}
                onSubmit={handleAddCard}
            />
        </div>
    );
}