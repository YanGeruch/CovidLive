import { ChartConfiguration } from 'chart.js';

export const CHART_CONFIG: ChartConfiguration<'line'> = {
  type: 'line',
  data: {
    datasets: [{
      label: 'Confirmed',
      data: [],
    }]
  },
  options: {
    plugins: {
      title: {
        text: 'Confirmed cases',
        display: true
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'MM YYYY'
        },
      },
    },
  }
};
