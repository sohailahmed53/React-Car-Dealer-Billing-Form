// App.js

import React from 'react';
import CarForm from './components/CarForm';
// import './CarForm.css'; // Import the CSS file

function App() {
  return (
    <div className="container"> {/* Add this wrapping div */}
      <h1>Car Dealer Billing Form</h1>
      <CarForm />
    </div>
  );
}

export default App;