import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './AllRoutes/AllRoutes';

function App() {
  return (
    <div>
      <ToastContainer />
      <AllRoutes />
    </div>
  )
}

export default App
