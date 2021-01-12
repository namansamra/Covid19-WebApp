import React, { useState, useEffect } from 'react';
import { fetchDaily } from '../../api';
import { Line,Bar} from 'react-chartjs-2';

import styles from './charts.module.css'



function Charts({data:{confirmed,recovered,deaths},country}) {
  const [dailydata, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      
      setDailyData(await fetchDaily());

    };
    fetchApi();
  }, []);

  const Linechart = dailydata.length ? (
    <Line
      data={{
        labels: dailydata.map(({ date }) => date),
        datasets: [
          {
            data: dailydata.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailydata.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: "red",
            backgroundColor: "rgba(250,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0,0,255,0.6)',
              'rgba(0,255,0,0.6)',
              'rgba(255,0,0,0.6)',
            ],
            data:[confirmed.value,recovered.value,deaths.value]
          },
        ],
      }}
      option={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country} ` },
      }}
    />
  ) : null;
  

  return <div className={styles.container}>
    {country?barChart:Linechart}
  </div>;
}

export default Charts;
