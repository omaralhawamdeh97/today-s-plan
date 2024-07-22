// src/components/TaskInput.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';
import { Box, Button, TextField, Paper } from '@mui/material';

const TaskInput: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskInput;
