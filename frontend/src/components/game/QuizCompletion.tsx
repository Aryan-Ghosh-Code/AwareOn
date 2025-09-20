// QuizCompletion.tsx
import React from 'react';
import type { UserAnswer, Question } from '../../types';
import { getScoreLevel, getSDGIcon } from '../../utils/gameHelper';

interface QuizCompletionProps {
    userAnswers: UserAnswer[];
    questions: Question[];
    points: number;
    onResetQuiz: () => void;
}

export const QuizCompletion: React.FC<QuizCompletionProps> = ({
    userAnswers,
    questions,
    points,
    onResetQuiz
}) => {
    const scoreLevel = getScoreLevel(userAnswers, questions.length);
    const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
    const totalEarned = userAnswers.reduce((sum, a) => sum + a.points, 0);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className={`${scoreLevel.bg} rounded-lg p-6 text-center mb-6`}>
                <div className={`text-3xl font-bold ${scoreLevel.color} mb-2`}>
                    {scoreLevel.title}
                </div>
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                    Quiz Complete!
                </div>
                <div className="text-lg text-gray-600">
                    You scored {correctAnswers} out of {questions.length} questions correctly
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">{points}</div>
                    <div className="text-sm">Total Points</div>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">+{totalEarned}</div>
                    <div className="text-sm">Points Earned</div>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Your Performance:</h3>
                {userAnswers.map((answer, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${answer.isCorrect
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="text-lg mr-2">{getSDGIcon(questions[index].sdg)}</span>
                                <span className="text-sm text-gray-600">Q{index + 1}</span>
                                {answer.isCorrect && (
                                    <span className="ml-2 text-green-600 font-bold">+{answer.points} pts</span>
                                )}
                            </div>
                            <span className="text-lg">{answer.isCorrect ? '✅' : '❌'}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <button
                    onClick={onResetQuiz}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
                >
                    <span className="mr-2">🔄</span>
                    Play Again
                </button>
            </div>
        </div>
    );
};