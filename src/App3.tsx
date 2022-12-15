import { forwardRef, useImperativeHandle, useRef } from "react";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { randNumber } from "@ngneat/falso";
import { Chart } from "react-chartjs-2";

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

interface Handler {
  clear(): void;
  updateData(n: number, a: number[]): void;
  getLabels(): unknown[] | undefined;
  getXLen(): number | undefined;
}

const LineChart1 = forwardRef<Handler, any>((props, ref) => {
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

/**
 * Returns an iterator that iterates integers in [start, end).
 */
function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

function App3() {
  const chart = useRef<Handler>(null!);
  const clearChart = () => chart.current.clear();
  const getLabels = () => console.log(chart.current.getLabels());
  const getXLen = () => console.log(chart.current.getXLen());
  function genData(): number[] {
    const len = chart.current.getXLen();
    if (!len) {
      return [];
    }
    return [...range(0, len)].map(() => randNumber({ min: -1000, max: 1000 }));
  }
  function setData(n: number) {
    chart.current.updateData(n, genData());
  }

  return (
    <>
      <h1>forwardRef example 3</h1>
      <div style={{ width: "32em", height: "14em" }}>
        <LineChart1 ref={chart} />
        <div>
          <button onClick={clearChart}>clear</button>
          <button onClick={getLabels}>debug: getLabels</button>
          <button onClick={getXLen}>debug: getXLen</button>
          <button onClick={() => setData(0)}>update 0</button>
          <button onClick={() => setData(1)}>update 1</button>
        </div>
      </div>
    </>
  );
}

export default App3;
