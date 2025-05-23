import React, { useState } from 'react';
import NumberCard from './NumberCard';
import SpinButton from './SpinButton';
import { useSlotMachine } from '../hooks/useSlotMachine';
import { Award, ChevronDown, ChevronUp, ToggleLeft, ToggleRight, Flag, FlagOff } from 'lucide-react';

const SlotMachine: React.FC = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [filterReviewOnly, setFilterReviewOnly] = useState(false);
  const { 
    digits, 
    currentNumber,
    isSpinning, 
    allCompleted, 
    spin, 
    toggleComplete, 
    toggleNumberReview,
    isCurrentNumberCompleted,
    completedNumbers 
  } = useSlotMachine();

  const filteredNumbers = filterReviewOnly
    ? completedNumbers.filter(item => item.needs_review)
    : completedNumbers;

  const sortedCompletedNumbers = [...filteredNumbers].sort((a, b) => a.number - b.number);
  const progressPercentage = (completedNumbers.length / 169) * 100;
  const needsReviewCount = completedNumbers.filter(item => item.needs_review).length;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
        Number Slot Machine
      </h1>
      
      <div className="flex flex-col items-center w-full">
        {allCompleted ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 bg-green-100 rounded-lg shadow-md">
            <Award className="h-16 w-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center">
              All numbers completed!
            </h2>
            <p className="text-green-600 mt-2 text-center">
              Congratulations! You've completed all 169 numbers.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="flex justify-center gap-4 md:gap-8 my-8">
                {digits.map((digit, index) => (
                  <NumberCard
                    key={index}
                    digit={digit}
                    isSpinning={isSpinning}
                  />
                ))}
              </div>
              
              {currentNumber && (
                <button 
                  onClick={toggleComplete}
                  className={`
                    mt-4 flex items-center gap-2 
                    px-6 py-2 rounded-full 
                    ${isCurrentNumberCompleted 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }
                    transition-colors duration-200
                  `}
                >
                  {isCurrentNumberCompleted ? (
                    <ToggleRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-purple-500" />
                  )}
                  <span className="text-lg font-medium">
                    {isCurrentNumberCompleted ? 'Completed' : 'Mark Complete'} ({currentNumber})
                  </span>
                </button>
              )}
            </div>
            
            <div className="mt-8">
              <SpinButton onSpin={spin} disabled={isSpinning} />
            </div>
          </>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg w-full">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Slot Machine Stats
        </h3>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-purple-800">
                {completedNumbers.length} / 169
              </span>
              {needsReviewCount > 0 && (
                <span className="text-sm font-medium text-amber-600">
                  ({needsReviewCount} for review)
                </span>
              )}
            </div>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-1 text-right">
            <span className="text-sm text-gray-500">
              {progressPercentage.toFixed(1)}% Complete
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            <span className="font-medium text-gray-700">
              {showCompleted ? 'Hide' : 'Show'} Completed Numbers
            </span>
            {showCompleted ? (
              <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {showCompleted && (
            <button
              onClick={() => setFilterReviewOnly(!filterReviewOnly)}
              className={`
                w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-200
                ${filterReviewOnly 
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-800' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
              `}
            >
              <Flag className={`h-5 w-5 ${filterReviewOnly ? 'text-amber-600' : 'text-gray-600'}`} />
              <span className="font-medium">
                {filterReviewOnly ? 'Show All Numbers' : 'Show Only Numbers for Review'}
              </span>
            </button>
          )}
        </div>

        {showCompleted && sortedCompletedNumbers.length > 0 && (
          <div className="mt-4 grid grid-cols-8 gap-2">
            {sortedCompletedNumbers.map(({ number, needs_review }) => (
              <button
                key={number}
                onClick={() => toggleNumberReview(number)}
                className={`
                  text-sm font-medium px-2 py-1 rounded-md text-center
                  transition-colors duration-200 relative group
                  ${needs_review 
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'}
                `}
              >
                {number}
                <span className={`
                  absolute -top-1 -right-1 w-3 h-3
                  ${needs_review ? 'text-amber-500' : 'text-green-500 opacity-0 group-hover:opacity-100'}
                  transition-opacity duration-200
                `}>
                  {needs_review ? <Flag className="w-full h-full" /> : <FlagOff className="w-full h-full" />}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotMachine;