// src/components/TaskList.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Box,
  ListItemSecondaryAction,
  Paper,
  Collapse,
} from '@mui/material';
import { Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import { RootState } from '../app/store';
import {
  toggleTask,
  toggleSubTask,
  addSubTask,
  deleteTask,
  deleteSubTask,
} from '../features/tasks/tasksSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [subTaskText, setSubTaskText] = useState<{ [key: number]: string }>({});
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const handleSubTaskChange = (taskId: number, text: string) => {
    setSubTaskText({ ...subTaskText, [taskId]: text });
  };

  const handleAddSubTask = (taskId: number) => {
    if (subTaskText[taskId]?.trim()) {
      dispatch(addSubTask({ taskId, text: subTaskText[taskId] }));
      setSubTaskText({ ...subTaskText, [taskId]: '' });
    }
  };

  const handleToggleOpen = (taskId: number) => {
    setOpen({ ...open, [taskId]: !open[taskId] });
  };

  return (
    <List>
      {tasks.map((task) => (
        <Paper elevation={3} sx={{ mb: 2, p: 2 }} key={task.id}>
          <ListItem>
            <Checkbox
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <ListItemText primary={task.text} />
            <IconButton edge="end" onClick={() => handleToggleOpen(task.id)}>
              {open[task.id] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => dispatch(deleteTask(task.id))}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={open[task.id]} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 4 }}>
              <List>
                {task.subTasks.map((subTask) => (
                  <ListItem key={subTask.id}>
                    <Checkbox
                      checked={subTask.completed}
                      onChange={() =>
                        dispatch(toggleSubTask({ taskId: task.id, subTaskId: subTask.id }))
                      }
                    />
                    <ListItemText primary={subTask.text} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() =>
                          dispatch(deleteSubTask({ taskId: task.id, subTaskId: subTask.id }))
                        }
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Box component="form" sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label="New Sub-Task"
                  variant="outlined"
                  fullWidth
                  value={subTaskText[task.id] || ''}
                  onChange={(e) => handleSubTaskChange(task.id, e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddSubTask(task.id)}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Collapse>
        </Paper>
      ))}
    </List>
  );
};

export default TaskList;
