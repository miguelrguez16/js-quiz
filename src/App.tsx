import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { JavaScriptLogo } from "./logo";
import { Game, Start } from "./pages";
import { useQuestionsStore } from "./store/useQuestions";

const App = () => {
  const questions = useQuestionsStore((state) => state.questions);
  console.log(questions);
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" component="h1" sx={{ marginBottom: 4 }}>
            JavaScript Quizz
          </Typography>
          <JavaScriptLogo />
        </Stack>

        {/* PAGES */}
        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
};

export default App;
