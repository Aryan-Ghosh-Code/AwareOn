import type { ScoreLevel, UserAnswer } from '../types';
import { pointValues, sdgInfo } from '../constants/questions';

export const calculatePoints = (difficulty: 'easy' | 'medium' | 'hard', streakBonus: number): number => {
    return pointValues[difficulty] + (streakBonus * 5);
};

export const getSDGColor = (sdg: number): string => {
    return sdgInfo[sdg]?.color || 'bg-gray-500';
};

export const getSDGIcon = (sdg: number): string => {
    return sdgInfo[sdg]?.icon || '🎯';
};

export const getSDGTitle = (sdg: number): string => {
    return sdgInfo[sdg]?.title || 'SDG Quiz';
};

export const getStreakMessage = (streak: number): string => {
    if (streak >= 5) return "🔥 Amazing streak! Maximum bonus!";
    if (streak >= 3) return "⭐ Great streak going!";
    if (streak >= 2) return "✨ Nice streak!";
    return "";
};

export const getScoreLevel = (userAnswers: UserAnswer[], totalQuestions: number): ScoreLevel => {
    const percentage = (userAnswers.filter(a => a.isCorrect).length / totalQuestions) * 100;

    if (percentage >= 90) {
        return { title: "SDG Champion! 🏆", color: "text-yellow-600", bg: "bg-yellow-50" };
    }
    if (percentage >= 70) {
        return { title: "Environmental Hero! 🌟", color: "text-green-600", bg: "bg-green-50" };
    }
    if (percentage >= 50) {
        return { title: "Nature Friend! 🌱", color: "text-blue-600", bg: "bg-blue-50" };
    }
    return { title: "Keep Learning! 📚", color: "text-purple-600", bg: "bg-purple-50" };
};

// Storage utilities (for localStorage simulation in this environment)
export const getStoredPoints = (): number => {
    // In a real app: return parseInt(localStorage.getItem('sdg-quiz-points') || '0', 10);
    return 0; // Default value for this environment
};

export const setStoredPoints = (points: number): void => {
    // In a real app: localStorage.setItem('sdg-quiz-points', points.toString());
    // For this environment, we'll just use React state
    console.log(`Points saved: ${points}`);
};

export const getButtonClassName = (
    index: number,
    selectedAnswer: number | null,
    correctAnswer: number,
    showResult: boolean
): string => {
    let buttonClass = "w-full p-4 text-left rounded-lg border transition-all duration-200 ";

    if (showResult) {
        if (index === correctAnswer) {
            buttonClass += "bg-green-100 border-green-500 text-green-800";
        } else if (index === selectedAnswer && index !== correctAnswer) {
            buttonClass += "bg-red-100 border-red-500 text-red-800";
        } else {
            buttonClass += "bg-gray-50 border-gray-200 text-gray-500";
        }
    } else if (selectedAnswer === index) {
        buttonClass += "bg-indigo-100 border-indigo-500 text-indigo-800 transform scale-102";
    } else {
        buttonClass += "bg-gray-50 border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300 hover:transform hover:scale-101";
    }

    return buttonClass;
};