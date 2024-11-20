import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { routeConfig } from './routes';
import './styles/main.scss';
import SnackbarProvider from '../src/hooks/SnackbarProvider';
import './assets/scss/main.scss';
import './assets/scss/color_skins.scss';
import 'font-awesome/css/font-awesome.min.css';
// ... existing code ...
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
