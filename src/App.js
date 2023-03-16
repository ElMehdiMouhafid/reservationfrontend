import './App.css';

import VolListScreen from './components/vols-list.component'
import AddResrvation from "./components/add-reservation.component";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <div className="container mt-3">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<VolListScreen/>} />
              <Route path="/reservation/:id" element={<AddResrvation />} />
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
