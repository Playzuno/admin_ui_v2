import Snackbar from '../components/Snackbar';
import axios from '../utils/axios';
import { SnackbarContext } from './useSnackbar';
import { useEffect, useState } from 'react';

export default function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'error',
  });
  const showSnack = ({ message, type = 'error' }) => {
    setSnackbar({
      open: true,
      message: message,
      type: type,
    });
  };
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };
  return (
    <SnackbarContext.Provider value={showSnack}>
      <Snackbar
        isOpen={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleCloseSnackbar}
      />
      {children}
    </SnackbarContext.Provider>
  );
}
