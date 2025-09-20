import React from 'react';
import type { Question } from '../../types';
import { getButtonClassName } from '../../utils/gameHelper';

interface QuestionCardProps {
    question: Question;
    selectedAnswer: number | null;
    showResult: boolean;
    onAnswerSelect: (answerIndex: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    selectedAnswer,
    showResult,
    onAnswerSelect
}) => {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {question.question}
            </h2>

            <div className="space-y-3">
                {question.options.map((option, index) => {
                    const buttonClass = getButtonClassName(
                        index,
                        selectedAnswer,
                        question.correct,
                        showResult
                    );

                    return (
                        <button
                            key={index}
                            onClick={() => onAnswerSelect(index)}
                            className={buttonClass}
                            disabled={showResult}
                        >
                            <div className="flex justify-between items-center">
                                <span>{option}</span>
                                {showResult && index === question.correct && (
                                    <span className="text-xl">✅</span>
                                )}
                                {showResult && index === selectedAnswer && index !== question.correct && (
                                    <span className="text-xl">❌</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};