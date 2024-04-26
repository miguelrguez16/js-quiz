import { Button } from "@mui/material";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/useQuestionsStore";

export const Footer = () => {
  const { correct, incorrect, unansewered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`🟩 ${correct} - 🟥 ${incorrect} - ❓${unansewered}`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button onClick={() => reset()}>Reset</Button>
      </div>
    </footer>
  );
};
