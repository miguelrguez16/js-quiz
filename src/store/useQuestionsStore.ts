import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { type Question as QuestionType } from "../types";

import confetti from "canvas-confetti";
import { getAllQuestions } from "../services";

interface State {
  questions: QuestionType[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,

          fetchQuestions: async (limit: number) => {
            const json = await getAllQuestions();
            let questions = json.sort(() => Math.random() - 0.5); // desordenar
            questions = questions.slice(0, limit);
            console.log("fetchQuestions" );
            set({ questions }, undefined, "FETCH_QUESTIONS");
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            console.log("selectAnswer" );
            const newQuestions = structuredClone(questions);
            const questionIndex = newQuestions.findIndex(
              (q) => (q.id = questionId)
            );
            const questionInfo = newQuestions[questionIndex];

            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;
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
            console.log("goNextQuestion" );
            if (next < questions.length) {
              set({ currentQuestion: next });
            }
          },
          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previous = currentQuestion - 1;            
            console.log("goPreviousQuestion" );

            if (previous >= 0) {
              set({ currentQuestion: previous });
            }
          },
          reset: () => {
            console.log("reset" );
            set({ questions: [], currentQuestion: 0 });
          },
        };
      },
      {
        name: "questions",
      }
    )
  )
);
