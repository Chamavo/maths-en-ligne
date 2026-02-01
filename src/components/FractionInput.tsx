import React, { useState, useEffect } from 'react';
import { parseFraction, isFractionQuestion, isTimeQuestion, isFractionOperationQuestion, isInputFractionFormat, isTimeCategory } from '@/utils/fractionUtils';

interface FractionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  question: string;
  category?: string;
  disabled?: boolean;
}

const FractionInput: React.FC<FractionInputProps> = ({
  value,
  onChange,
  onSubmit,
  question,
  category = '',
  disabled = false,
}) => {
  const [inputMode, setInputMode] = useState<'number' | 'fraction' | 'time'>('number');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [showFractionWarning, setShowFractionWarning] = useState(false);
  
  const isFractionOp = isFractionOperationQuestion(question);
  const showFractionOption = isFractionQuestion(question);
  const isTimeQuestionType = isTimeQuestion(question) || isTimeCategory(category);
  const showTimeOption = isTimeQuestionType;
  
  // Pour les opérations de fractions, forcer le mode fraction
  // Pour les questions de temps, forcer le mode temps
  useEffect(() => {
    if (isFractionOp) {
      setInputMode('fraction');
    } else if (isTimeQuestionType) {
      setInputMode('time');
    }
  }, [isFractionOp, isTimeQuestionType]);
  
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  const handleNumeratorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumerator(e.target.value);
    if (e.target.value && denominator) {
      onChange(`${e.target.value}/${denominator}`);
    }
  };
  
  const handleDenominatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDenominator(e.target.value);
    if (numerator && e.target.value) {
      onChange(`${numerator}/${e.target.value}`);
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHours(val);
    onChange(`${val}:${minutes.padStart(2, '0') || '00'}`);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Limiter à 59
    if (parseInt(val) > 59) val = '59';
    setMinutes(val);
    onChange(`${hours || '0'}:${val.padStart(2, '0')}`);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  const switchToFraction = () => {
    setInputMode('fraction');
    setNumerator('');
    setDenominator('');
    onChange('');
  };
  
  const switchToNumber = () => {
    setInputMode('number');
    onChange('');
  };

  const switchToTime = () => {
    setInputMode('time');
    setHours('');
    setMinutes('');
    onChange('');
  };
  
  return (
    <div className="space-y-3">
      {/* Pour les opérations de fractions, afficher un message */}
      {isFractionOp && (
        <p className="text-center text-sm font-medium text-purple-600">
          📝 Répondez sous forme de fraction (ex: 1/2, 3/4)
        </p>
      )}
      
      {/* Afficher les boutons de choix seulement si ce n'est PAS une opération de fractions */}
      {!isFractionOp && (showFractionOption || showTimeOption) && (
        <div className="flex justify-center gap-2 mb-2 flex-wrap">
          <button
            type="button"
            onClick={switchToNumber}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              inputMode === 'number'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Nombre
          </button>
          {showFractionOption && (
            <button
              type="button"
              onClick={switchToFraction}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                inputMode === 'fraction'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fraction
            </button>
          )}
          {showTimeOption && (
            <button
              type="button"
              onClick={switchToTime}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                inputMode === 'time'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Durée (HH:mm)
            </button>
          )}
        </div>
      )}
      
      {inputMode === 'number' && (
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleNumericChange}
          onKeyDown={handleKeyDown}
          className="w-full text-center text-4xl font-bold px-4 py-4 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
          placeholder="?"
          autoFocus
          disabled={disabled}
        />
      )}
      
      {inputMode === 'fraction' && (
        <div className="flex items-center justify-center gap-2">
          <input
            type="number"
            value={numerator}
            onChange={handleNumeratorChange}
            onKeyDown={handleKeyDown}
            className="w-24 text-center text-3xl font-bold px-3 py-3 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
            placeholder="?"
            autoFocus
            disabled={disabled}
          />
          <span className="text-4xl font-bold text-gray-600">/</span>
          <input
            type="number"
            value={denominator}
            onChange={handleDenominatorChange}
            onKeyDown={handleKeyDown}
            className="w-24 text-center text-3xl font-bold px-3 py-3 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
            placeholder="?"
            disabled={disabled}
          />
        </div>
      )}

      {inputMode === 'time' && (
        <div className="flex items-center justify-center gap-2">
          <input
            type="number"
            min="0"
            max="99"
            value={hours}
            onChange={handleHoursChange}
            onKeyDown={handleKeyDown}
            className="w-20 text-center text-3xl font-bold px-3 py-3 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
            placeholder="H"
            autoFocus
            disabled={disabled}
          />
          <span className="text-4xl font-bold text-gray-600">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={handleMinutesChange}
            onKeyDown={handleKeyDown}
            className="w-20 text-center text-3xl font-bold px-3 py-3 border-2 border-purple-300 rounded-lg focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
            placeholder="mm"
            disabled={disabled}
          />
        </div>
      )}
      
      {!isFractionOp && showFractionOption && inputMode === 'number' && (
        <p className="text-center text-sm text-gray-500">
          💡 Tu peux aussi répondre en fraction (ex: 1/2, 3/4)
        </p>
      )}
      
      {!isFractionOp && showTimeOption && inputMode === 'number' && (
        <p className="text-center text-sm text-gray-500">
          💡 Tu peux aussi répondre en durée (ex: 1:45 pour 1h45min)
        </p>
      )}
    </div>
  );
};

export default FractionInput;
