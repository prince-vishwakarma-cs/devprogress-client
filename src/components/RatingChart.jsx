import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format } from 'date-fns';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, rating } = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: '#fff',
        borderRadius: '5rem',
        padding: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        border: 'none',
      }}>
        <p>{`${date} : ${rating}`}</p>
      </div>
    );
  }
  return null;
};

export const RatingChart = ({ ratingData = [] }) => {
  if (!ratingData || ratingData.length === 0) {
    return <div>No data available</div>;
  }

  const chartData = ratingData.map(item => ({
    date: format(new Date(item.getyear, item.getmonth - 1, item.getday), 'MMM dd, yyyy'),
    rating: parseInt(item.rating, 10),
  }));

  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.8)' }} />
        <YAxis tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.8)' }} />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="rating" 
          stroke="rgb(143, 253, 211)" 
          activeDot={{ r: 8 }} 
          strokeWidth={3} 
          dot={{ stroke: '#fff', strokeWidth: 2, r: 6 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
