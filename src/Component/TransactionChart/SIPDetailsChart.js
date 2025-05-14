import React from 'react';
import { BarChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Monthly', AUM: 75, Clients: 50 },
  { name: 'Weekly', AUM: 25, Clients: 20 },
];

function SIPDetailsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="AUM" fill="#82ca9d" />
        <Line type="monotone" dataKey="Clients" stroke="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SIPDetailsChart;
