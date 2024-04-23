import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { type Question as QuestionType } from "../types";

import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionsStore } from "../store/useQuestions";

const getBackground = (info: QuestionType, answerIndex: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer == null) {
    return "transparent";
  }

  if (answerIndex !== correctAnswer && answerIndex !== userSelectedAnswer)
    return "transparent";

  if (answerIndex === correctAnswer) return "green";

  return "red";
};

export const Question = ({ information }: { information: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const handelSelectAnswer = (answerIndex: number) =>
    selectAnswer(information.id, answerIndex);

  return (
    <Card variant="outlined" sx={{ textAlign: "left", bgcolor: "#222", p: 2 }}>
      <Typography variant="h5">{information.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {information.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#222" }} disablePadding>
        {information.answers.map((answer, index) => (
          <ListItem key={index} divider>
            <ListItemButton
              disabled={information.userSelectedAnswer !== undefined}
              onClick={() => handelSelectAnswer(index)}
              sx={{ backgroundColor: getBackground(information, index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
