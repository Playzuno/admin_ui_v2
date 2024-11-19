import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { routeConfig } from './routes';
import './styles/main.scss';
import SnackbarProvider from '../src/hooks/SnackbarProvider';
const AppRoutes = () => {
  const routes = useRoutes(routeConfig);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AppRoutes />
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
