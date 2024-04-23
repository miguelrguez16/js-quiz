import { create } from "zustand";
import { type Question as QuestionType } from "../types";

import confetti from "canvas-confetti";

interface State {
  questions: QuestionType[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch("http://localhost:5173/data.json");
      const json = await res.json();

      let questions = json.sort(() => Math.random() - 0.5); // desordenar
      questions = questions.slice(0, limit);
      set({ questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();

      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex((q) => (q.id = questionId));
      const questionInfo = newQuestions[questionIndex];

      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
      if (isCorrectUserAnswer) {
        confetti();
      }

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };
      set({ questions: newQuestions });
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const next = currentQuestion + 1;
      if (next < questions.length) {
        set({ currentQuestion: next });
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previous = currentQuestion - 1;
      if (previous >= 0) {
        set({ currentQuestion: previous });
      }
    },
  };
});
