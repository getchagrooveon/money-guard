import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [
    {
      label: 'My First Dataset',
      hoverOffset: 2,
      cutout: '80%',
    },
  ],
};
export default function Chart({ sumData }) {
  data.labels = sumData.map(e => e.name);
  data.datasets[0].data = sumData.map(e => e.total);
  data.datasets[0].backgroundColor = sumData.map(e => e.color);
  //   console.log(data.datasets[0].backgroundColor);
  return <Doughnut id="myChart" data={data} />;
}
