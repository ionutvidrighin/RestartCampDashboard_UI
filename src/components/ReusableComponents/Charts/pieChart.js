import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10c7b5', '#e43d6f'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const containerStyle = {
  position: 'relative',
  top: '-2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

export default function RoundChart({ data }) {
  return (
    <div style={containerStyle} className="pieChart-container">
      <PieChart width={450} height={450}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#26a9e0"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <section className="pt-2">
        <div>PREZENTI</div>
        <div>ABSENTI</div>
      </section>
    </div>
  );
}
