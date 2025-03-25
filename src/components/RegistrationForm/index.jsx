import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegistrationForm = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(new Set());

  const validateForm = () => {
    const newErrors = new Set();
    if (!name.trim()) newErrors.add('name');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.add('email');
    if (!phone.trim()) newErrors.add('phone');
    setErrors(newErrors);
    return newErrors.size === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit({ name, email, phone });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, p: { xs: 1, md: 2 } }}>
      <TextField
        label="Ім'я"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.has('name')}
        helperText={errors.has('name') && "Вкажіть ім'я"}
      />

      <TextField
        label="E-mail"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.has('email')}
        helperText={errors.has('email') && "Некоректний E-mail"}
      />

      <Typography
        sx={{
          mt: 2,
          mb: 1,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Телефон
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <PhoneInput
          country="ua"
          value={phone}
          onChange={setPhone}
          inputProps={{ name: 'phone', required: true }}
          containerStyle={{ marginBottom: '16px', width: '300px', height: '56px' }}
          inputStyle={{
            width: '100%',
            height: '100%',
            fontSize: '1.2rem',
            padding: '10px',
            paddingLeft: '40px',
          }}
        />
      </Box>

      {errors.has('phone') && (
        <Typography variant="caption" color="error" display="block">
          Вкажіть номер телефону
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          width: { xs: '100%', md: '50%' },
          alignSelf: 'center',
        }}
      >
        Відправити
      </Button>
    </Box>
  );
};

export default RegistrationForm;
