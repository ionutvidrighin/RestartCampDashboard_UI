import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import dayjs from 'dayjs';
import localizedFormat  from 'dayjs/plugin/localizedFormat';
import localeData from "dayjs/plugin/localeData";
import 'dayjs/locale/ro';

dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.locale("ro");

const useStyles = makeStyles({
  button: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#509ecc',
    "&:hover": {
      backgroundColor: '#509ecc'
    }
  },
  legendElement: {
    width: '30px',
    height: '30px',
    background: '#509ecc'
  },
})

const LineChart = ({ chartTitle, chartData, chartLegend}) => {
  // **Props explanation:
  // chartTitle - String -> the actual title passed from parent component
  // chartData - Array of Objects -> the actual data to be rendered in the chart
  // chartLegend - Array of Objects -> only passed from "CursantiPerCurs" component

  const localStyles = useStyles()

  // set chart's X axis Labels
  let chartXAxisLabels;
  chartData.forEach(item => {
    item.hasOwnProperty('date') ? chartXAxisLabels = 'date' : chartXAxisLabels = 'curs'
  })

  chartData = chartData.map(entry => ({
    ...entry,
    date: dayjs(entry.date).locale('ro').format('ll').slice(0, -4)
  }))

  return (
    <div style={{width: '100%'}} className="mb-5 line-chart">
      {/* chartLegend !== undefined &&
        <div className="chart-legend">
          <h6 className='pb-2 fw-bold'>Legendă grafic:</h6>
          { chartLegend !== undefined && chartLegend.map((element, index) => (
            <div key={index} className='d-flex'>
              <Avatar variant='circular' sizes='1' className={localStyles.legendElement}>
                {element.curs.substring(0, 1)}
              </Avatar>
              <p className='ms-2'>
                <span>{element.curs.substring(1)},</span>
                <span className='ms-2 fw-bold' style={{color: 'black'}}>Înscrieri: {element.inscrieri}</span>
              </p>
            </div>
          ) )}
        </div>
      */}

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="chart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#26a9e0" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#26a9e0" stopOpacity={0.05} />
            </linearGradient>
          </defs>
            <Area dataKey='înscrieri' activeDot={{ stroke: 'white', strokeWidth: 5 }} type={'natural'} stroke="#2671e0" fill="url(#chart)" />
            <XAxis dataKey={`${chartXAxisLabels}`} stroke="white" tickLine={false} axisLine={false} />
            <YAxis dataKey='înscrieri' stroke="white" tickLine={false} axisLine={false} />
          <CartesianGrid opacity={0.3} />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChart;
