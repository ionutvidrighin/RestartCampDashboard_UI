import React, { PureComponent } from 'react';
import {
  ComposedChart,
  LabelList,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';


export default function BarChart ({ data }) {
  return (
    <ComposedChart
      layout="vertical"
      width={500}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid opacity={0.2} stroke="white" />
      <XAxis type="number" stroke="white" tickLine={false} axisLine={false} />
      <YAxis dataKey="name" type="category" scale="band" stroke="white" tickLine={false} axisLine={false} />
      <Tooltip />
      <Bar dataKey="inscrisi" label barSize={150} fill="#ffc96b" />
      <Bar dataKey="prezenti" label barSize={150} fill="#3fccab" />
      <Bar dataKey="absenti" label barSize={150} fill="#f75e7a" />
      <Legend />
    </ComposedChart>
  )
}
