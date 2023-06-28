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

// const createGradient = (ctx, x, y, radius) => {
//   const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
//   gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
//   gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');

//   return gradient;
// };

// function createGradient(ctx, area) {
//   const colorStart = '#ffffff';
//   const colorEnd =

//   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

//   gradient.addColorStop(0, colorStart);
//   gradient.addColorStop(0.5, colorEnd);
//   gradient.addColorStop(1, colorEnd);

//   return gradient;
// }
// const ctx = canvas.getContext('2d');

// console.log(ChartJS.prototype);
// console.log(ChartJS);
// const originalDoughnutDraw = ChartJS.prototype.draw;
// ChartJS.prototype.draw = function () {
//   originalDoughnutDraw.apply(this, arguments);

//   const chart = this.getChart();
//   const { ctx, chartArea } = chart;

//   if (!chartArea) return; // Chart area is not available yet

//   ctx.save();

//   const x = (chartArea.left + chartArea.right) / 2;
//   const y = (chartArea.top + chartArea.bottom) / 2;

//   const outerRadius = (chartArea.right - chartArea.left) / 2;
//   const innerRadius = (outerRadius * 3) / 4;

//   const startColor = 'rgba(255, 99, 132, 1)'; // Red
//   const endColor = 'rgba(255, 255, 255, 0)';

//   // Apply shadow effect
//   ctx.shadowOffsetX = 0;
//   ctx.shadowOffsetY = 5;
//   ctx.shadowBlur = 5;
//   ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';

//   // Create and apply gradient fill
//   const gradient = createGradient(
//     ctx,
//     x,
//     y,
//     innerRadius,
//     outerRadius,
//     startColor,
//     endColor
//   );
//   ctx.fillStyle = gradient;
//   ctx.beginPath();
//   ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
//   ctx.arc(x, y, innerRadius, Math.PI * 2, 0, true);
//   ctx.closePath();
//   ctx.fill();

//   ctx.restore();
// };

const data = {
  datasets: [
    {
      label: 'Expenses',
      cutout: '80%',
    },
  ],
};
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
// const plugins = {
//   beforeDraw: function (chart) {
//     const { width, height, ctx } = chart;
//     console.log('beforeDraw', chart);

//     ctx.clearRect(0, 0, width, height);

//     ctx.shadowOffsetX = 0;
//     ctx.shadowOffsetY = 5;
//     ctx.shadowBlur = 5;
//     ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';

//     const centerX = width / 2,
//       centerY = height / 2,
//       radius = Math.min(width / 2, height / 2) - 5;

//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
//     ctx.closePath();
//     ctx.fillStyle = createGradient(ctx, centerX, centerY, radius);
//     ctx.fill();
//   },
//   legend: {
//     position: 'top',
//   },
// };
export default function Chart({ sumData }) {
  data.datasets[0].data = sumData.map(e => e.total);
  data.datasets[0].backgroundColor = sumData.map(e => e.color);
  // ({ chart }) => {
  //   const { ctx, area } = chart;
  //   console.log('Im gradient ctx', chart);
  //   console.log('Im gradient area', area);
  //   const colorStart = '#ffff0033';
  //   const colorEnd = '#bababa';

  //   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  //   gradient.addColorStop(0, colorStart);
  //   gradient.addColorStop(0.05, colorEnd);
  //   gradient.addColorStop(0.1, colorEnd);

  //   return gradient;
  // };
  return (
    <div className={css.chart}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
