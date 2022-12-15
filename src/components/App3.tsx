import { randNumber } from "@ngneat/falso";
import { useCallback, useRef, useState, memo } from "react";
import { range } from "../utils";
import LineChart1, { LineChart1Handler } from "./LineChart1";

function App3() {
  console.log("App3 render");
  const chart = useRef<LineChart1Handler>(null!);
  const [count, setCount] = useState(0);

  const clearChart = useCallback(() => {
    return chart.current.clear();
  }, [chart]);

  const getLabels = useCallback(() => {
    return console.log(chart.current.getLabels());
  }, [chart]);

  const getXLen = useCallback(() => {
    return console.log(chart.current.getXLen());
  }, [chart]);

  const genData = useCallback((): number[] => {
    const len = chart.current.getXLen();
    if (!len) {
      return [];
    }
    return [...range(0, len)].map(() => randNumber({ min: -1000, max: 1000 }));
  }, [chart]);

  const setData = useCallback(
    (n: number) => {
      chart.current.updateData(n, genData());
    },
    [chart]
  );

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

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
          Count: {count}
          <button onClick={increment}>+</button>
        </div>
      </div>
    </>
  );
}

export default memo(App3);
