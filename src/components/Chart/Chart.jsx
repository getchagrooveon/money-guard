import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import css from './Chart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      label: 'Expenses',
      cutout: '80%',
    },
  ],
};
export default function Chart({ sumData }) {
  data.datasets[0].data = sumData.map(e => e.total);
  data.datasets[0].backgroundColor = sumData.map(e => e.color);
  return (
    <div className={css.chart}>
      <Doughnut data={data} />
    </div>
  );
}
