
import ImageUpload from './ImageUpload';
import Home from './Home'
import CampsiteDetails from './CampsiteDetails';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/campsite/:id" element={<CampsiteDetails />} />
          </Routes>
      </Router>
    </>

  );
}

export default App