// Invoice.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Invoice.css';

const Invoice = () => {
  // Retrieve state data from the location prop
  const { state } = useLocation();
  const { carModel, insurance, accessories, dealerDiscount, totalCost } = state || {};

  // Constants for car prices
  const carPrices = {
    "Polo Trendline": 8.70,
    "Polo Highline": 10.09,
    "Virtus Trendline": 11.05,
    "Virtus Highline": 13.08,
    "Taigun Trendline": 14.89,
    "Taigun Highline": 15.42,
    "Taigun Topline": 17.71,
  };

  // Get the cost of the selected car
  const selectedCarCost = carPrices[carModel] * 100000;

  // Constants for additional charges
  const rtoCost = 113990;
  const tcsCost = 11000;
  const insuranceCost = insurance ? 47300 : 0;
  const accessoriesCost = accessories ? 15000 : 0;

  // Calculate the applied discount (limited to 30,000)
  const appliedDiscount = Math.min(dealerDiscount, 30000);

  // Calculate the final total cost
  const finalTotalCost =
    selectedCarCost + rtoCost + tcsCost + insuranceCost + accessoriesCost - appliedDiscount;

  // Format the values for display
  const formattedCarCost = `${Intl.NumberFormat().format(selectedCarCost.toFixed(2))} INR`;
  const formattedInsuranceCost = insurance ? `${Intl.NumberFormat().format(insuranceCost.toFixed(2))} INR` : '';
  const formattedAccessoriesCost = accessories ? ` ${Intl.NumberFormat().format(accessoriesCost.toFixed(2))} INR` : '';
  const formattedDealerDiscount = `${Intl.NumberFormat().format(appliedDiscount.toFixed(2))} INR`;
  const formattedRTOCost = ` ${Intl.NumberFormat().format(rtoCost.toFixed(2))} INR`;
  const formattedTCSCost = ` ${Intl.NumberFormat().format(tcsCost.toFixed(2))} INR`;
  const formattedTotalCost = ` ${Intl.NumberFormat().format(finalTotalCost.toFixed(2))} INR`;

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div className="title-date">
          <h2 className="title">INVOICE</h2>
          <p className="date"></p>
        </div>
        <div className="space"></div>
      </div>
      <div className="invoice-body">
        <div className="table">
          <div className="table-header">
            <div style={{ paddingLeft: '12px' }}>Selected Car</div>
            <div className='row'>Car Cost</div>
            <div className='row'>Insurance</div>
           
            <div className='row'>Accessories</div>
            <div className='row'>Discount</div>
            <div className='row'>RTO Cost</div>
            <div className='row'>TCS Cost</div>
          </div>
          <div className="table-row">
            <div className='row'>{carModel}</div>
            <div className='row'>{formattedCarCost}</div>
            <div className='row'>
            {insurance && <div>{formattedInsuranceCost}</div>}
            </div>
            <div className='row'>
            {accessories && <div>{formattedAccessoriesCost}</div>}
            </div>
            <div className='row'>{formattedDealerDiscount}</div>
            <div className='row'>{formattedRTOCost}</div>
            <div className='row'>{formattedTCSCost}</div>
          </div>
        </div>
        <div className="sum"> <span style={{fontWeight:'600', fontSize:'1.3rem'}}>Total Cost: </span>{formattedTotalCost} </div>
      </div>
    </div>

  );
};

export default Invoice;
