import React, { useRef } from "react";
import "./App.css";

function App() {
  const ref1 = useRef<HTMLInputElement>(null!);
  const onClick1 = (msg: string) => {
    ref1.current.value = msg;
  };

  return (
    <>
      <h1>Hello!</h1>
      <div>
        <FancyButton ref={ref1} value="test1">
          <b>button</b>
        </FancyButton>
        <button onClick={() => onClick1("*1111*")}>test1</button>
        <button onClick={() => onClick1("*2222*")}>test2</button>
      </div>
    </>
  );
}

interface FancyButtonProps {
  value?: string;
  children: JSX.Element | string;
}

const FancyButton = React.forwardRef<any, FancyButtonProps>((props, ref) => {
  return (
    <div>
      <input type="text" ref={ref} value={props.value} />
      <button>{props.children}</button>
    </div>
  );
});

export default App;
