import {useState, useRef, useEffect} from 'react';
import {type CreditCard} from './types/Card';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Pagination} from 'swiper/modules';
import type {Swiper as SwiperType} from 'swiper';
import {Plus, RotateCw, ChevronLeft, ChevronRight, Trash2} from 'lucide-react';
import {CreditCardFront} from './components/CreditCardVisual/CreditCardFront';
import {CreditCardBack} from './components/CreditCardVisual/CreditCardBack';
import {CreditCardForm} from './components/CreditCardForm';
import {api} from './services/Api';

export default function App() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef<SwiperType | null>(null);

    // 🔄 Carrega cartões do backend ao iniciar
    useEffect(() => {
        loadCards().catch(err => {
            console.error('Erro ao inicializar:', err);
        });
    }, []);

    const loadCards = async () => {
        try {
            setLoading(true);
            const data = await api.getCards();
            setCards(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCard = async (newCard: Omit<CreditCard, 'id'>) => {

        const createdCard = await api.createCard(newCard);
        setCards(prevCards => [...prevCards, createdCard]);
        setShowForm(false);

        setTimeout(() => {
            if (swiperRef.current) {
                swiperRef.current.slideTo(cards.length);
            }
            setCurrentCarouselIndex(cards.length);
        }, 100);

    };

    const handleDeleteCard = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar este cartão?')) return;

        try {
            await api.deleteCard(id);
            setCards(prevCards => prevCards.filter(c => c.id !== id));

            // Remove do flipped cards se estava virado
            setFlippedCards(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });

            // Ajusta o índice se necessário
            if (currentCarouselIndex >= cards.length - 1) {
                setCurrentCarouselIndex(Math.max(0, cards.length - 2));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const toggleCardFlip = () => {
        const currentCardId = cards[currentCarouselIndex]?.id;
        if (!currentCardId) return;

        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(currentCardId)) {
                newSet.delete(currentCardId);
            } else {
                newSet.add(currentCardId);
            }
            return newSet;
        });
    };

    const goToNextCard = () => {
        if (swiperRef.current && cards.length > 1) {
            swiperRef.current.slideNext();
        }
    };

    const goToPrevCard = () => {
        if (swiperRef.current && cards.length > 1) {
            swiperRef.current.slidePrev();
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 text-white overflow-hidden flex flex-col">
            {/* Efeitos de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"/>
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: '1s'}}/>
            </div>

            {/* Título */}
            <div className="relative z-10 pt-8 px-8">
                <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                    Gestão de Cartões de Crédito
                </h1>
                <p className="text-purple-200 text-center text-lg mb-4">
                    Adicione e gerencie seus cartões com estilo
                </p>
            </div>

            {/* Área do Carrossel */}
            <div className="flex-grow flex items-center justify-center relative z-10">

                {/* LOADING */}
                {loading && (
                    <div className="text-purple-300 text-center">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                        <p>Carregando cartões...</p>
                    </div>
                )}

                {/* CARROSSEL */}
                {!loading && cards.length > 0 && !showForm && (
                    <div className="w-full max-w-6xl px-4">
                        <div className="relative">
                            {/* Setas */}
                            {cards.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevCard}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-purple-600/30 hover:bg-purple-600/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl"
                                    >
                                        <ChevronLeft className="w-6 h-6"/>
                                    </button>

                                    <button
                                        onClick={goToNextCard}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-purple-600/30 hover:bg-purple-600/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl"
                                    >
                                        <ChevronRight className="w-6 h-6"/>
                                    </button>
                                </>
                            )}

                            <Swiper
                                effect="coverflow"
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={cards.length === 1 ? 1 : 3}
                                spaceBetween={30}
                                loop={cards.length > 1}
                                coverflowEffect={{
                                    rotate: 30,
                                    stretch: 0,
                                    depth: 200,
                                    modifier: 1,
                                    slideShadows: false,
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                modules={[EffectCoverflow, Pagination]}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                onSlideChange={(swiper: SwiperType) => {
                                    setCurrentCarouselIndex(swiper.realIndex);
                                }}
                                initialSlide={currentCarouselIndex}
                                className="my-swiper"
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 20
                                    },
                                    768: {
                                        slidesPerView: cards.length === 1 ? 1 : 2,
                                        spaceBetween: 30
                                    },
                                    1024: {
                                        slidesPerView: cards.length === 1 ? 1 : 3,
                                        spaceBetween: 30
                                    }
                                }}
                            >
                                {cards.map((card, index) => {
                                    const isFlipped = flippedCards.has(card.id);

                                    return (
                                        <SwiperSlide key={card.id}>
                                            <div className="flex items-center justify-center py-8">
                                                <div
                                                    onClick={() => index === currentCarouselIndex && toggleCardFlip()}
                                                    className={`relative ${index === currentCarouselIndex ? 'cursor-pointer' : 'pointer-events-none'}`}
                                                    style={{
                                                        transformStyle: 'preserve-3d',
                                                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                        transition: 'transform 0.6s',
                                                    }}
                                                >
                                                    {/* Frente */}
                                                    <div style={{backfaceVisibility: 'hidden'}}>
                                                        <CreditCardFront card={card}/>
                                                    </div>

                                                    {/* Verso */}
                                                    <div
                                                        className="absolute top-0 left-0"
                                                        style={{
                                                            backfaceVisibility: 'hidden',
                                                            transform: 'rotateY(180deg)'
                                                        }}
                                                    >
                                                        <CreditCardBack card={card}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        {/* Controles */}
                        <div className="flex flex-col items-center gap-4 mt-6">
                            <div className="flex gap-3">
                                <button
                                    onClick={toggleCardFlip}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 font-semibold"
                                >
                                    <RotateCw className="w-5 h-5"/>
                                    {flippedCards.has(cards[currentCarouselIndex]?.id) ? 'Ver Frente' : 'Ver Verso'}
                                </button>

                                <button
                                    onClick={() => handleDeleteCard(cards[currentCarouselIndex]?.id)}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 font-semibold"
                                >
                                    <Trash2 className="w-5 h-5"/>
                                    Deletar
                                </button>
                            </div>

                            <p className="text-purple-300 text-sm">
                                Cartão {currentCarouselIndex + 1} de {cards.length} • Clique no cartão ou no botão para
                                virar
                            </p>
                        </div>
                    </div>
                )}

                {/* ESTADO VAZIO */}
                {!loading && cards.length === 0 && !showForm && (
                    <div className="flex flex-col items-center gap-6">
                        <div className="opacity-30 hover:opacity-50 transition-opacity">
                            <CreditCardFront card={{}}/>
                        </div>
                        <p className="text-purple-300/70 text-center text-sm">
                            Nenhum cartão cadastrado ainda.<br/>
                            Clique no botão abaixo para adicionar seu primeiro cartão!
                        </p>
                    </div>
                )}
            </div>

            {/* BOTÃO DE ADICIONAR */}
            {!showForm && !loading && (
                <div className="flex justify-center pb-8 relative z-10">
                    <div className="relative group">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"/>

                        <button
                            onClick={() => setShowForm(true)}
                            className="relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                        >
                            <Plus className="w-8 h-8"/>
                        </button>

                        <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-white text-slate-800 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                            Adicionar cartão de crédito
                            <div
                                className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"/>
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