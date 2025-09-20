import { useState, useEffect } from 'react';
import type { QuizState, UserAnswer, Question } from '../types';
import { calculatePoints, getStoredPoints, setStoredPoints } from '../utils/gameHelper';

export const useQuiz = (questions: Question[]) => {
    const [quizState, setQuizState] = useState<QuizState>({
        currentQuestion: 0,
        selectedAnswer: null,
        showResult: false,
        points: 0,
        streak: 0,
        gameCompleted: false,
        userAnswers: []
    });

    // Initialize points from storage
    useEffect(() => {
        const storedPoints = getStoredPoints();
        setQuizState(prev => ({ ...prev, points: storedPoints }));
    }, []);

    const handleAnswerSelect = (answerIndex: number) => {
        if (quizState.showResult) return;
        setQuizState(prev => ({ ...prev, selectedAnswer: answerIndex }));
    };

    const handleNextQuestion = () => {
        if (quizState.selectedAnswer === null) return;

        const currentQ = questions[quizState.currentQuestion];
        const isCorrect = quizState.selectedAnswer === currentQ.correct;

        const newUserAnswer: UserAnswer = {
            questionIndex: quizState.currentQuestion,
            selectedAnswer: quizState.selectedAnswer,
            isCorrect,
            points: 0
        };

        let newStreak = quizState.streak;
        let newPoints = quizState.points;

        if (isCorrect) {
            newStreak = quizState.streak + 1;
            const earnedPoints = calculatePoints(currentQ.difficulty, Math.min(newStreak, 5));
            newPoints += earnedPoints;
            newUserAnswer.points = earnedPoints;

            // Save to storage
            setStoredPoints(newPoints);
        } else {
            newStreak = 0;
        }

        const newUserAnswers = [...quizState.userAnswers, newUserAnswer];

        setQuizState(prev => ({
            ...prev,
            points: newPoints,
            streak: newStreak,
            userAnswers: newUserAnswers,
            showResult: true
        }));

        // Auto-advance to next question or complete quiz
        setTimeout(() => {
            if (quizState.currentQuestion < questions.length - 1) {
                setQuizState(prev => ({
                    ...prev,
                    currentQuestion: prev.currentQuestion + 1,
                    selectedAnswer: null,
                    showResult: false
                }));
            } else {
                setQuizState(prev => ({ ...prev, gameCompleted: true }));
            }
        }, 2500);
    };

    const resetQuiz = () => {
        setQuizState(prev => ({
            ...prev,
            currentQuestion: 0,
            selectedAnswer: null,
            showResult: false,
            streak: 0,
            gameCompleted: false,
            userAnswers: []
        }));
    };

    return {
        quizState,
        handleAnswerSelect,
        handleNextQuestion,
        resetQuiz
    };
};