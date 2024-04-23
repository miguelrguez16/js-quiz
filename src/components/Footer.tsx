import { useQuestionsData } from "../hooks/useQuestionsData";

export const Footer = () => {
  const { correct, incorrect, unansewered } = useQuestionsData();

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`🟩 ${correct} - 🟥 ${incorrect} - ❓${unansewered}`}</strong>
    </footer>
  );
};
