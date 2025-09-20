// ResultDisplay.tsx
import React from 'react';
import type { Question } from '../../types';
import { calculatePoints } from '../../utils/gameHelper';

interface ResultDisplayProps {
    question: Question;
    selectedAnswer: number;
    streak: number;
    earnedPoints: number;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
    question,
    selectedAnswer,
    streak,
    earnedPoints
}) => {
    const isCorrect = selectedAnswer === question.correct;

    return (
        <div className={`mb-6 p-4 rounded-lg ${isCorrect
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
            }`}>
            <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">
                    {isCorrect ? '🎉' : '💡'}
                </span>
                <span className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                </span>
                {isCorrect && (
                    <span className="ml-auto bg-green-200 text-green-800 px-2 py-1 rounded text-sm font-bold">
                        +{earnedPoints} points
                    </span>
                )}
            </div>
            <p className="text-gray-700 text-sm">
                {question.explanation}
            </p>
        </div>
    );
};