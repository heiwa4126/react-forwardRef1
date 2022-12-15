import { useRef, useImperativeHandle, forwardRef } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Chart } from "react-chartjs-2";
import { randNumber } from "@ngneat/falso";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => randNumber({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => randNumber({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

interface Handler {
  clear(): void;
}

const LineChart1 = forwardRef<Handler>((props, ref) => {
  const chart = useRef<ChartJS>(null!);
  useImperativeHandle(ref, () => {
    return { clear };
  });

  return <Chart type="line" ref={chart} options={options} data={data} />;

  function clear() {
    chart.current.clear();
  }
});

function App3() {
  const chart = useRef<Handler>(null!);
  const clearChart = () => chart.current.clear();
  return (
    <>
      <div style={{ width: "32em", height: "14em" }}>
        <LineChart1 ref={chart} />
        <div>
          <button onClick={clearChart}>clear</button>
        </div>
      </div>
    </>
  );
}

export default App3;
