import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/useQuestionsStore";

export const Start: React.FC = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  return (
    <Button onClick={() => fetchQuestions(10)} variant="contained">
      Empezar!
    </Button>
  );
};
