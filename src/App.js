import logo from './logo.svg';
import './App.css';

import ZoneManagementComponent from './components/Zone';
import City from './components/City';
import CityList from './components/CityList';
import Login from './components/Login';
import Specialite from './components/Specialite'
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Zone from './components/Zone';
import Serie from './components/Serie';
import { Restaurant } from '@mui/icons-material';
function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<AdminDashboard />} >
          <Route path='' element={<City />} />
          <Route path='Z' element={<Zone />} />
          <Route path='serie' element={<Serie />} />
          <Route path='spec' element={<Specialite />} />
          <Route path='resto' element={<Restaurant />} />
          {/*<Route path='citylist' element={<CityList />} />*/}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
