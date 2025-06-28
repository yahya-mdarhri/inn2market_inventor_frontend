import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
import { UserProvider } from '@context/UserContext';

createRoot(document.getElementById('root')!).render(
    <UserProvider>
      <App />
    </UserProvider>,
)
