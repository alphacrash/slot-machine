import { useState, useEffect, useCallback } from 'react';
import { getCompletedNumbers, saveCompletedNumber, removeCompletedNumber, isAllCompleted, toggleReviewStatus } from '../utils/storage';
import { CompletedNumber } from '../types';

const MAX_NUMBER = 169;

export const useSlotMachine = () => {
  const [digits, setDigits] = useState<(number | null)[]>([null, null, null]);
  const [completedNumbers, setCompletedNumbers] = useState<CompletedNumber[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const stored = await getCompletedNumbers();
      setCompletedNumbers(stored);
      setAllCompleted(await isAllCompleted());
    };
    fetchData();
  }, []);

  const currentNumber = digits.every(d => d !== null) 
    ? parseInt(digits.join(''), 10)
    : null;

  const generateRandomNumber = useCallback((): number => {
    const availableNumbers = Array.from({ length: MAX_NUMBER }, (_, i) => i + 1)
      .filter(num => !completedNumbers.some(item => item.number === num));
    
    if (availableNumbers.length === 0) return 0;
    
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  }, [completedNumbers]);

  const numberToDigits = (num: number): number[] => {
    return num.toString().padStart(3, '0').split('').map(Number);
  };

  const spin = useCallback(() => {
    if (allCompleted) return;
    
    setIsSpinning(true);
    
    const spinInterval = setInterval(() => {
      setDigits(prevDigits => 
        prevDigits.map(() => Math.floor(Math.random() * 10))
      );
    }, 100);
    
    setTimeout(() => {
      clearInterval(spinInterval);
      const newNumber = generateRandomNumber();
      setDigits(numberToDigits(newNumber));
      setIsSpinning(false);
    }, 1000);
  }, [allCompleted, generateRandomNumber]);

  const toggleComplete = useCallback(async () => {
    if (!currentNumber) return;
    
    if (completedNumbers.some(item => item.number === currentNumber)) {
      await removeCompletedNumber(currentNumber);
      setCompletedNumbers(prev => prev.filter(item => item.number !== currentNumber));
    } else {
      await saveCompletedNumber(currentNumber);
      setCompletedNumbers(prev => [...prev, { number: currentNumber, needs_review: false }]);
    }
    
    setAllCompleted(await isAllCompleted());
  }, [currentNumber, completedNumbers]);

  const toggleNumberReview = useCallback(async (number: number) => {
    await toggleReviewStatus(number);
    const updated = await getCompletedNumbers();
    setCompletedNumbers(updated);
  }, []);

  const isCurrentNumberCompleted = currentNumber 
    ? completedNumbers.some(item => item.number === currentNumber)
    : false;

  return {
    digits,
    currentNumber,
    isSpinning,
    allCompleted,
    spin,
    toggleComplete,
    toggleNumberReview,
    isCurrentNumberCompleted,
    completedNumbers
  };
};