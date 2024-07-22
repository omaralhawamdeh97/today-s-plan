// src/App.tsx
import React from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { Container, CssBaseline } from '@mui/material';
import './App.css';

const App: React.FC = () => {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Header />
      <TaskInput />
      <TaskList />
    </Container>
  );
};

export default App;
