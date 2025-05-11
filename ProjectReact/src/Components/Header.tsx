import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Layout = (children: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button color="primary" onClick={() => navigate('/')}>
              עמוד הבית
            </Button>
            <Button color="primary" onClick={() => navigate('/AllRecipes')}>
              כל המתכונים
            </Button>
            <Button color="primary" onClick={() => navigate('/AddRecipe')}>
              להוספת מתכון
            </Button>
            <Button color="primary" onClick={() => navigate('/Login')}>
              כניסה
            </Button>
            <Button color="primary" onClick={() => navigate('/SignUp')}>
              הרשמה
            </Button>
          </Box>
        </Toolbar>
      </Container>
       <main className="flex-1 w-full p-6">{children.children}</main>
    </AppBar>
  );
};

export default Layout;
