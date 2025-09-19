import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import RegisterSection from './components/RegisterSection';
import VerifyEmail from './components/VerifyEmail';
import SuccessRegistration from './components/SuccessRegistration';
import PrivateRoute from './services/AuthnticatedRoute';
import PublicRoute from './services/PublicRoutes';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute element={Login} />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/register" element={<PublicRoute element={RegisterSection} />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/registration-success" element={<SuccessRegistration />} />
          <Route path="/home" element={<PrivateRoute element={Home} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
