// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';

const Header: React.FC = () => {
  const today = new Date().toLocaleDateString();

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <EventNoteIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Today's Plan
        </Typography>
        <Typography variant="body1">{today}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
