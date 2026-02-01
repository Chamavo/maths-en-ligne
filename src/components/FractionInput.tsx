import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  // Force explicit white background + dark text for visibility in all contexts
  const baseInputClass =
    "bg-white text-gray-900 placeholder:text-gray-400 caret-gray-900";

  const focusInputClass =
    "border-2 border-primary/30 rounded-lg focus:ring-4 focus:ring-primary/20 focus:border-primary focus:outline-none";

  // Memoize question analysis to prevent recalculation on every render
  const questionAnalysis = useMemo(() => ({
    isFractionOp: isFractionOperationQuestion(question),
    showFractionOption: isFractionQuestion(question),
    isTimeQuestionType: isTimeQuestion(question) || isTimeCategory(category),
  }), [question, category]);

  const { isFractionOp, showFractionOption, isTimeQuestionType } = questionAnalysis;
  const showTimeOption = isTimeQuestionType;

  // Determine initial mode based on question type
  const getInitialMode = useCallback((): 'number' | 'fraction' | 'time' => {
    if (isFractionOp) return 'fraction';
    if (isTimeQuestionType) return 'time';
    return 'number';
  }, [isFractionOp, isTimeQuestionType]);

  const [inputMode, setInputMode] = useState<'number' | 'fraction' | 'time'>(getInitialMode);
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  
  // Track previous question to detect changes
  const prevQuestionRef = useRef(question);
  const inputRef = useRef<HTMLInputElement>(null);
  const numeratorRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);
  
  // Reset input state when question changes (not just mode)
  useEffect(() => {
    if (prevQuestionRef.current !== question) {
      prevQuestionRef.current = question;
      
      // Determine new mode
      const newMode = getInitialMode();
      setInputMode(newMode);
      
      // Clear all input states
      setNumerator('');
      setDenominator('');
      setHours('');
      setMinutes('');
      
      // Focus appropriate input after state update (use requestAnimationFrame for reliability)
      requestAnimationFrame(() => {
        if (newMode === 'fraction' && numeratorRef.current) {
          numeratorRef.current.focus();
        } else if (newMode === 'time' && hoursRef.current) {
          hoursRef.current.focus();
        } else if (inputRef.current) {
          inputRef.current.focus();
        }
      });
    }
  }, [question, getInitialMode]);
  
  const handleNumericChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);
  
  const handleNumeratorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumerator = e.target.value;
    setNumerator(newNumerator);
    if (newNumerator && denominator) {
      onChange(`${newNumerator}/${denominator}`);
    } else if (newNumerator) {
      // Partial input - update parent with just numerator for validation awareness
      onChange(newNumerator);
    }
  }, [denominator, onChange]);
  
  const handleDenominatorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newDenominator = e.target.value;
    setDenominator(newDenominator);
    if (numerator && newDenominator) {
      onChange(`${numerator}/${newDenominator}`);
    }
  }, [numerator, onChange]);

  const handleHoursChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHours(val);
    const paddedMinutes = minutes.padStart(2, '0') || '00';
    onChange(`${val}:${paddedMinutes}`);
  }, [minutes, onChange]);

  const handleMinutesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Limiter à 59
    if (parseInt(val) > 59) val = '59';
    setMinutes(val);
    onChange(`${hours || '0'}:${val.padStart(2, '0')}`);
  }, [hours, onChange]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      e.preventDefault();
      onSubmit();
    }
  }, [disabled, onSubmit]);
  
  const switchToFraction = useCallback(() => {
    setInputMode('fraction');
    setNumerator('');
    setDenominator('');
    onChange('');
    requestAnimationFrame(() => numeratorRef.current?.focus());
  }, [onChange]);
  
  const switchToNumber = useCallback(() => {
    setInputMode('number');
    onChange('');
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [onChange]);

  const switchToTime = useCallback(() => {
    setInputMode('time');
    setHours('');
    setMinutes('');
    onChange('');
    requestAnimationFrame(() => hoursRef.current?.focus());
  }, [onChange]);
  
  return (
    <div className="space-y-3">
      {/* Pour les opérations de fractions, afficher un message */}
      {isFractionOp && (
        <p className="text-center text-sm font-medium text-primary">
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
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
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
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
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
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Durée (HH:mm)
            </button>
          )}
        </div>
      )}
      
      {inputMode === 'number' && (
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleNumericChange}
          onKeyDown={handleKeyDown}
           className={`w-full text-center text-4xl font-bold px-4 py-4 ${baseInputClass} ${focusInputClass}`}
          placeholder="?"
          disabled={disabled}
        />
      )}
      
      {inputMode === 'fraction' && (
        <div className="flex items-center justify-center gap-2">
          <input
            ref={numeratorRef}
            type="number"
            value={numerator}
            onChange={handleNumeratorChange}
            onKeyDown={handleKeyDown}
             className={`w-24 text-center text-3xl font-bold px-3 py-3 ${baseInputClass} ${focusInputClass}`}
            placeholder="?"
            disabled={disabled}
          />
          <span className="text-4xl font-bold text-muted-foreground">/</span>
          <input
            type="number"
            value={denominator}
            onChange={handleDenominatorChange}
            onKeyDown={handleKeyDown}
             className={`w-24 text-center text-3xl font-bold px-3 py-3 ${baseInputClass} ${focusInputClass}`}
            placeholder="?"
            disabled={disabled}
          />
        </div>
      )}

      {inputMode === 'time' && (
        <div className="flex items-center justify-center gap-2">
          <input
            ref={hoursRef}
            type="number"
            min="0"
            max="99"
            value={hours}
            onChange={handleHoursChange}
            onKeyDown={handleKeyDown}
             className={`w-20 text-center text-3xl font-bold px-3 py-3 ${baseInputClass} ${focusInputClass}`}
            placeholder="H"
            disabled={disabled}
          />
          <span className="text-4xl font-bold text-muted-foreground">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={handleMinutesChange}
            onKeyDown={handleKeyDown}
             className={`w-20 text-center text-3xl font-bold px-3 py-3 ${baseInputClass} ${focusInputClass}`}
            placeholder="mm"
            disabled={disabled}
          />
        </div>
      )}
      
      {!isFractionOp && showFractionOption && inputMode === 'number' && (
        <p className="text-center text-sm text-muted-foreground">
          💡 Tu peux aussi répondre en fraction (ex: 1/2, 3/4)
        </p>
      )}
      
      {!isFractionOp && showTimeOption && inputMode === 'number' && (
        <p className="text-center text-sm text-muted-foreground">
          💡 Tu peux aussi répondre en durée (ex: 1:45 pour 1h45min)
        </p>
      )}
    </div>
  );
};

export default FractionInput;
