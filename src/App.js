import './App.css';
import Navbar from './components/Navbar';
import Camera from './components/Camera';
import { Routes, Route } from 'react-router-dom';
import Impression from './components/Impression';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Impression />} />
          <Route path="/camera" element={<Camera />} />
       </Routes>
    </>
  );
}

export default App;
