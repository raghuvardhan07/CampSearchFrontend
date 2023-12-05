import ImageUpload from './ImageUpload';
import Home from './Home'
import CampsiteDetails from './CampsiteDetails';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfilePage from './Profile';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ children }) {
  const auth = useAuth();
  console.log("Auth: " + auth);
  return auth.session ? <>{children}</> : <Navigate to="/login" />;
}


function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/signup" element={<SignupForm />}/>
            <Route path="/upload" element={<PrivateRoute><ImageUpload /></PrivateRoute>} />
            <Route path="/campsite/:id" element={<PrivateRoute><CampsiteDetails /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          </Routes>
      </Router>
    </>

  );
}

export default App