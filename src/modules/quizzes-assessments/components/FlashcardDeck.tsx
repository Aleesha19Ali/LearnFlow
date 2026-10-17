import React, { useState } from 'react';
import { type Flashcard } from '../types';
import { sampleFlashcards } from '../mockData';
import { ArrowLeft, RotateCw, CheckCircle2, Lightbulb, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface FlashcardDeckProps {
  onBack: () => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ onBack }) => {
  const [cards, setCards] = useState<Flashcard[]>(sampleFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentCard = cards[currentIndex];
  const totalCards = cards.length;
  const masteredCount = cards.filter((c) => c.mastered).length;

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const toggleMastered = () => {
    setCards((prev) =>
      prev.map((card, idx) =>
        idx === currentIndex ? { ...card, mastered: !card.mastered } : card
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Mastered: {masteredCount} / {totalCards}</span>
        </div>
      </div>

      {/* Main Flashcard Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md flex flex-col items-center min-h-[380px] justify-between relative overflow-hidden">
        {/* Top Info Bar */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400 font-semibold mb-4">
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
            {currentCard.category}
          </span>
          <span>
            Card {currentIndex + 1} of {totalCards}
          </span>
        </div>

        {/* Card Content Area (Click to Flip) */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full flex-1 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-slate-50/50 rounded-2xl transition-all border border-dashed border-slate-200 my-2 group"
        >
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase mb-3 px-2 py-0.5 bg-indigo-50 rounded">
            {isFlipped ? 'ANSWER' : 'QUESTION'}
          </span>

          <p className="text-lg md:text-xl font-bold text-slate-800 max-w-xl leading-relaxed">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>

          <p className="text-[11px] text-slate-400 mt-6 flex items-center gap-1 group-hover:text-indigo-600 transition-colors">
            <RotateCw className="w-3 h-3" /> Click card to flip
          </p>
        </div>

        {/* Hint Box if toggled */}
        {showHint && currentCard.hint && (
          <div className="w-full bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs flex items-center gap-2 mb-4 animate-fadeIn">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            <span><strong>Hint:</strong> {currentCard.hint}</span>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="w-full flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={() => setShowHint(!showHint)}
            disabled={!currentCard.hint}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>

          <button
            onClick={toggleMastered}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentCard.mastered
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {currentCard.mastered ? 'Mastered ✓' : 'Mark as Mastered'}
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Card
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
        >
          Next Card <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;
