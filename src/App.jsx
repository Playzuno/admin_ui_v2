import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { routeConfig } from './routes';
import './styles/main.scss';
import SnackbarProvider from '../src/hooks/SnackbarProvider';

import '../node_modules/bootstrap/scss/bootstrap.scss';
import './assets/scss/main.scss';
import './assets/scss/color_skins.scss';
import '../node_modules/font-awesome/css/font-awesome.min.css';

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
