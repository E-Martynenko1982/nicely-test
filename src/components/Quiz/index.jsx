import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

const quizQuestions = [
  {
    id: 1,
    questionText: 'Яке Ваше улюблене заняття у вихідні?',
    options: ['Подорожі', 'Активний спорт', 'Читання/Навчання'],
  },
  {
    id: 2,
    questionText: 'Який Ваш улюблений колір?',
    options: ['Синій', 'Зелений', 'Червоний'],
  },
  {
    id: 3,
    questionText: 'Ви віддаєте перевагу каві чи чаю?',
    options: ['Кава', 'Чай', 'Не п’ю ні те, ні інше'],
  },
  {
    id: 4,
    questionText: 'Ви більше любите гори чи море?',
    options: ['Гори', 'Море', 'Важко відповісти'],
  },
  {
    id: 5,
    questionText: 'Ви зазвичай полюбляєте працювати вранці чи ввечері?',
    options: ['Вранці', 'Ввечері', 'Залежить від настрою'],
  },
];

const Quiz = ({ onComplete }) => {
  const [answerMap, setAnswerMap] = useState(new Map());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionChange = (questionId, selectedOption) =>
    setAnswerMap((prev) => new Map(prev).set(questionId, selectedOption));

  const handleNextClick = () => {
    currentQuestionIndex < quizQuestions.length - 1
      ? setCurrentQuestionIndex(currentQuestionIndex + 1)
      : onComplete(answerMap);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Питання {currentQuestionIndex + 1} із {quizQuestions.length}:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {currentQuestion.questionText}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={answerMap.get(currentQuestion.id) || ''}
          onChange={(e) => handleOptionChange(currentQuestion.id, e.target.value)}
        >
          {currentQuestion.options.map((option, idx) => (
            <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleNextClick}
        sx={{
          mt: 2,
          alignSelf: 'center',
          width: { xs: '100%', md: '70%', lg: '50%' },
        }}
      >
        {currentQuestionIndex < quizQuestions.length - 1 ? 'Далі' : 'Завершити'}
      </Button>
    </Box>
  );
};

export default Quiz;
