// QuizHeader.tsx
import React from 'react';
import type { Question } from '../../types';
import { getSDGIcon, getSDGTitle, calculatePoints, getStreakMessage } from '../../utils/gameHelper';

interface QuizHeaderProps {
    question: Question;
    currentQuestion: number;
    totalQuestions: number;
    points: number;
    streak: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
    question,
    currentQuestion,
    totalQuestions,
    points,
    streak
}) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <span className="text-2xl mr-2">{getSDGIcon(question.sdg)}</span>
                    <div>
                        <div className="text-sm text-gray-500">SDG {question.sdg}</div>
                        <div className="font-semibold text-gray-800">{getSDGTitle(question.sdg)}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{points}</div>
                    <div className="text-xs text-gray-500">points</div>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Question {currentQuestion + 1} of {totalQuestions}</span>
                <span className="capitalize">
                    {question.difficulty} • {calculatePoints(question.difficulty, Math.min(streak, 5))} pts
                </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
                />
            </div>

            {streak > 1 && (
                <div className="text-center mb-4">
                    <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {getStreakMessage(streak)}
                    </div>
                </div>
            )}
        </div>
    );
};