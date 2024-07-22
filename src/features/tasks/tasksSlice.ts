// src/features/tasks/tasksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
  subTasks: SubTask[];
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

let nextTaskId = 0;
let nextSubTaskId = 0;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: nextTaskId++,
        text: action.payload,
        completed: false,
        subTasks: [],
      });
    },
    addSubTask: (
      state,
      action: PayloadAction<{ taskId: number; text: string }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.subTasks.push({
          id: nextSubTaskId++,
          text: action.payload.text,
          completed: false,
        });
      }
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleSubTask: (
      state,
      action: PayloadAction<{ taskId: number; subTaskId: number }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        const subTask = task.subTasks.find(
          (st) => st.id === action.payload.subTaskId
        );
        if (subTask) {
          subTask.completed = !subTask.completed;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    deleteSubTask: (
      state,
      action: PayloadAction<{ taskId: number; subTaskId: number }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.subTasks = task.subTasks.filter(
          (st) => st.id !== action.payload.subTaskId
        );
      }
    },
  },
});

export const {
  addTask,
  addSubTask,
  toggleTask,
  toggleSubTask,
  deleteTask,
  deleteSubTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
