import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './App.css';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample data generation
const generateData = (numPoints) => {
  const labels = Array.from({ length: numPoints }, (_, i) => `${String(i).padStart(2, '0')}:00`);
  const consumptionData = Array.from({ length: numPoints }, () => Math.floor(Math.random() * 100) + 1);
  const costData = Array.from({ length: numPoints }, () => Math.floor(Math.random() * 50) + 10);
  const batteryData = Array.from({ length: numPoints }, () => Math.floor(Math.random() * 200) + 50);
  const powerData = Array.from({ length: numPoints }, () => Math.floor(Math.random() * 150) + 30);

  return { labels, consumptionData, costData, batteryData, powerData };
};

const App = () => {
  const [data, setData] = useState(generateData(12)); // Generate data for 12 hours
  const [lowCostNotification, setLowCostNotification] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [device, setDevice] = useState('Select Device');

  useEffect(() => {
    if (data.costData.some(cost => cost < 20) && !lowCostNotification) {
      alert('Cost is low!');
      setLowCostNotification(true); // Set notification flag to prevent repeated alerts
    }
  }, [data, lowCostNotification]);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Consumption (kWh)',
        data: data.consumptionData,
        borderColor: '#1E90FF', // Blue
        backgroundColor: 'rgba(30, 144, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Cost ($)',
        data: data.costData,
        borderColor: '#32CD32', // Green
        backgroundColor: 'rgba(50, 205, 50, 0.2)',
        fill: true,
      },
      {
        label: 'Battery Capacity (kWh)',
        data: data.batteryData,
        borderColor: '#FFA500', // Orange
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        fill: true,
      },
      {
        label: 'Total Power Generated (kWh)',
        data: data.powerData,
        borderColor: '#800080', // Purple
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Luminous Energy Management System</h1>
      <div className="controls">
        <select onChange={(e) => setDate(e.target.value)} value={date}>
          <option value="">Select Date</option>
          {Array.from({ length: 7 }, (_, i) => {
            const day = new Date();
            day.setDate(day.getDate() - i);
            return <option key={i} value={day.toISOString().split('T')[0]}>{day.toISOString().split('T')[0]}</option>;
          })}
        </select>
        <select onChange={(e) => setDevice(e.target.value)} value={device}>
          <option value="Select Device">Select Device</option>
          <option value="Refrigerator">Refrigerator</option>
          <option value="Air Conditioner">Air Conditioner</option>
          <option value="Washing Machine">Washing Machine</option>
          <option value="Electric Oven">Electric Oven</option>
          <option value="Water Heater">Water Heater</option>
        </select>
      </div>
      <div className="chart-container">
        <div className="chart">
          <h2>Consumption</h2>
          <Line data={{
            labels: data.labels,
            datasets: [{
              label: 'Consumption (kWh)',
              data: data.consumptionData,
              borderColor: '#1E90FF', // Blue
              backgroundColor: 'rgba(30, 144, 255, 0.2)',
              fill: true,
            }],
          }} />
        </div>
        <div className="chart">
          <h2>Cost</h2>
          <Line data={{
            labels: data.labels,
            datasets: [{
              label: 'Cost ($)',
              data: data.costData,
              borderColor: '#32CD32', // Green
              backgroundColor: 'rgba(50, 205, 50, 0.2)',
              fill: true,
            }],
          }} />
        </div>
        <div className="chart">
          <h2>Battery Capacity</h2>
          <Line data={{
            labels: data.labels,
            datasets: [{
              label: 'Battery Capacity (kWh)',
              data: data.batteryData,
              borderColor: '#FFA500', // Orange
              backgroundColor: 'rgba(255, 165, 0, 0.2)',
              fill: true,
            }],
          }} />
        </div>
        <div className="chart">
          <h2>Total Power Generated</h2>
          <Line data={{
            labels: data.labels,
            datasets: [{
              label: 'Total Power Generated (kWh)',
              data: data.powerData,
              borderColor: '#800080', // Purple
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              fill: true,
            }],
          }} />
        </div>
      </div>
      <div className="notification">
        {lowCostNotification && <p>Notification: Cost is low!</p>}
      </div>
    </div>
  );
};

export default App;
