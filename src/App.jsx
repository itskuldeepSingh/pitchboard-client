import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './componenets/Login';
import Dashboard from './componenets/Dashboard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
