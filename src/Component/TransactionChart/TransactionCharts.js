import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Commodities', Net: 20, Purchase: 30, Redemption: 10 },
  { name: 'Debt', Net: 25, Purchase: 35, Redemption: 15 },
  { name: 'Equity', Net: 30, Purchase: 40, Redemption: 20 },
  { name: 'Hybrid', Net: 10, Purchase: 20, Redemption: 5 },
];

function TransactionsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Net" fill="#8884d8" />
        <Bar dataKey="Purchase" fill="#82ca9d" />
        <Bar dataKey="Redemption" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default TransactionsChart;
