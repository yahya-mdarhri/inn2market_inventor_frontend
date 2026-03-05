import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import axios from 'axios';  
import { UserProvider } from '@context/UserContext';

// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.baseURL = "http://192.168.1.171:8000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;