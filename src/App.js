import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Page/login/login';
import Dashboard from './Page/dashboard/dashboard';
import store from './store';
import { Provider } from 'react-redux';
import SnackbarAlert from './components/snackbar/snackbar';

function App() {
  return (
    <Provider store={store}>
      <SnackbarAlert />
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
