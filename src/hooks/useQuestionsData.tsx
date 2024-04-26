import { useQuestionsStore } from "../store/useQuestionsStore";

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions);

  let correct = 0,
    incorrect = 0,
    unansewered = 0;

  questions.forEach((q) => {
    const { userSelectedAnswer, correctAnswer } = q;

    if (userSelectedAnswer === undefined) unansewered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });

  return { correct, incorrect, unansewered };
};
