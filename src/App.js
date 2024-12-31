
import './App.css';
// import Header from './components/Header';
import { BrowserRouter as Router , Routes , Route  } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUp';
import HomePage from './Pages/HomePage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>

      {/* ke haal hai laaddar */}
    </div>
  );
}

export default App;
