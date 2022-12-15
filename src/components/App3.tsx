import { randNumber } from "@ngneat/falso";
import { useRef } from "react";
import { range } from "../utils";
import LineChart1, { LineChart1Handler } from "./LineChart1";

function App3() {
  const chart = useRef<LineChart1Handler>(null!);
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
