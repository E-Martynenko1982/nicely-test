import { useState } from 'react';
import Quiz from './components/Quiz';
import RegistrationForm from './components/RegistrationForm';
import { Container, Typography, Box } from '@mui/material';
import { useSubmit } from './hooks/useSubmit';

function App() {
  const [quizAnswersMap, setQuizAnswersMap] = useState(new Map());
  const [showQuiz, setShowQuiz] = useState(true);
  const submitData = useSubmit(
    'https://crudcrud.com/api/bf8a2c5ab7464f1ea236eebf84f5f659/submit'
  );

  const handleQuizComplete = (answerMap) => {
    setQuizAnswersMap(answerMap);
    setShowQuiz(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const result = await submitData({
        quizAnswers: Object.fromEntries(quizAnswersMap),
        ...formData,
      });
      alert(`Дані надіслані успішно! Сервер відповів: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error(error);
      alert('Сталася помилка під час відправки даних. Перевірте консоль.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {showQuiz ? (
            <>
              <Typography variant="h1" gutterBottom noWrap sx={{ fontSize: '2rem' }}>
                Live busy status
              </Typography>
              <Quiz onComplete={handleQuizComplete} />
            </>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                Зареєструйтесь
              </Typography>
              <RegistrationForm onSubmit={handleFormSubmit} />
            </>
          )}
        </Box>
        <Box
          sx={{
            width: { xs: '100%', md: '80%' },
            height: { xs: 300, md: 400 },
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src="/assets/IMG_20250312_192903_840.jpg"
            alt="Adaptive"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
