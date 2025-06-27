import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import axios from 'axios';  

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function App() {
  return <RouterProvider router={router} />;
}

export default App;