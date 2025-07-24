import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import axios from 'axios';  
import { UserProvider } from '@context/UserContext';

// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.baseURL = "https://backendciemarket-baa6b6e1090a.herokuapp.com/";
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