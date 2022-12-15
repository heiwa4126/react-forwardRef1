import { randNumber } from "@ngneat/falso";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
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

export interface LineChart1Handler {
  clear(): void;
  updateData(n: number, a: number[]): void;
  getLabels(): unknown[] | undefined;
  getXLen(): number | undefined;
}

const LineChart1 = forwardRef<LineChart1Handler, any>((props, ref) => {
  const chart = useRef<ChartJS>(null!);
  useImperativeHandle(ref, () => {
    return { clear, updateData, getLabels, getXLen };
  });

  return <Chart type="line" ref={chart} options={options} data={data} />;

  function clear() {
    chart.current.clear();
  }

  function getLabels(): unknown[] | undefined {
    return chart.current.data.labels;
  }

  function getXLen(): number | undefined {
    return chart.current.data.labels?.length;
  }

  function updateData(n: number, a: number[]) {
    chart.current.data.datasets[n].data = a;
    chart.current.update();
  }
});

export default LineChart1;
