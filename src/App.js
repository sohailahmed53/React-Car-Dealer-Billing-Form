// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarForm from './components/CarForm';
import Invoice from './components/Invoice';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Car Dealer Billing Form</h1>
        <Routes>
          <Route path="/" element={<CarForm />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
