import { randNumber } from "@ngneat/falso";
import { useRef } from "react";
import { range } from "../utils";
import LineChart1, { LineChart1Handler } from "./LineChart1";

function App3() {
  const chart = useRef<LineChart1Handler>(null!);
  return (
    <>
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

  function clearChart() {
    return chart.current.clear();
  }
  function getLabels() {
    return console.log(chart.current.getLabels());
  }
  function getXLen() {
    return console.log(chart.current.getXLen());
  }
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
}

export default App3;
