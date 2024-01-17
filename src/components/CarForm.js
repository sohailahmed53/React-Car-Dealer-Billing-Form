import React, { useState } from 'react';
import './CarForm.css';

const CarForm = () => {
  // State for form fields and calculations
  const [carModel, setCarModel] = useState('');
  const [insurance, setInsurance] = useState(false);
  const [accessories, setAccessories] = useState(false);
  const [dealerDiscount, setDealerDiscount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Define the data tables for car prices and additional costs
  const carPrices = {
    "Polo Trendline": 8.70,
    "Polo Highline": 10.09,
    "Virtus Trendline": 11.05,
    "Virtus Highline": 13.08,
    "Taigun Trendline": 14.89,
    "Taigun Highline": 15.42,
    "Taigun Topline": 17.71,
  };

  const additionalCosts = {
    RTO: 113990,
    Insurance: 47300,
    TCS: 11000,
    Accessories: 15000,
  };

  // Function to calculate total cost
  const calculateTotalCost = () => {
    const carPrice = carPrices[carModel];

    // Additional Costs
    const insuranceCost = insurance ? additionalCosts.Insurance + additionalCosts.TCS : 0;
    const rtoCost = additionalCosts.RTO;
    const accessoriesCost = accessories ? additionalCosts.Accessories : 0;

    // Total Additional Costs
    const totalAdditionalCost = insuranceCost + rtoCost + accessoriesCost;

    // Apply discount (limited to 30,000)
    const appliedDiscount = Math.min(dealerDiscount, 30000);

    // Calculate total cost
    const totalCost = carPrice * 100000 + totalAdditionalCost - appliedDiscount;

    return totalCost;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!insurance && !accessories && dealerDiscount > 0) {
      alert("Any one of the additional features has to be added. No discount applied.");
      return;
    }

    if (dealerDiscount > 30000) {
      alert("Maximum discount should not exceed 30,000. Only 30,000 will be applied as a discount.");
      setDealerDiscount(30000);
    }

    const calculatedTotalCost = calculateTotalCost();
    setTotalCost(calculatedTotalCost);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Car Model Dropdown */}
      <label>
        Car Model:
        <select value={carModel} onChange={(e) => setCarModel(e.target.value)}>
          <option value="">Select a Car Model</option>
          {Object.keys(carPrices).map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </label>

      {/* Insurance Checkbox */}
      <label>
        Insurance:
        <input type="checkbox" checked={insurance} onChange={() => setInsurance(!insurance)} />
      </label>

      {/* Additional Accessories Checkbox */}
      <label>
        Additional Accessories:
        <input type="checkbox" checked={accessories} onChange={() => setAccessories(!accessories)} />
      </label>

      {/* Dealer Discount Input */}
      <label>
        Dealer Discount:
        <input
          type="number"
          value={dealerDiscount}
          onChange={(e) => setDealerDiscount(e.target.value)}
        />
      </label>

      {/* Submit Button */}
      <button type="submit">Calculate Total Cost</button>

      {/* Display Total Cost in INR */}
      {totalCost !== null && (
        <div>
          <h2>Total Cost: {Intl.NumberFormat().format(totalCost.toFixed(2))} INR</h2>
        </div>
      )}
    </form>
  );
};

export default CarForm;

