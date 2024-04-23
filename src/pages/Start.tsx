import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/useQuestions";

export const Start: React.FC = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  return (
    <Button onClick={() => fetchQuestions(10)} variant="contained">
      Empezar!
    </Button>
  );
};
