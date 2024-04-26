import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { Footer } from "../components/Footer";
import { Question } from "../components/Question";
import { useQuestionsStore } from "../store/useQuestionsStore";

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );
  const currentQuestionNumber = useQuestionsStore(
    (state) => state.currentQuestion
  );

  const currentQuestion = questions[currentQuestionNumber];
  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestionNumber === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestionNumber + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestionNumber >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question information={currentQuestion} />
      <Footer />
    </>
  );
};
