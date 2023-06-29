import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import css from './Chart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

const options = {
  responsive: true,
  elements: {
    arc: {
      borderWidth: 0, // Set the border width to 0 to remove the outer border
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  },
  tooltips: {
    enabled: false, // Disable tooltips to remove the hover effect
  },
};

export default function Chart({ sumData }) {
  const data = {
    datasets: [
      {
        label: 'Expenses',
        cutout: '80%',
      },
    ],
  };
  data.datasets[0].data = sumData.map(e => e.total);
  data.datasets[0].backgroundColor = sumData.map(e => e.color);
  return (
    <div className={css.chart}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
