import React, { useRef } from "react";

function App1() {
  const ref1 = useRef<HTMLInputElement>(null!);
  const onClick1 = (msg: string) => {
    ref1.current.value = msg;
  };

  return (
    <>
      <h1>forwardRef example 1</h1>
      <div>
        <InputX ref={ref1} refBack={ref1.current}>
          clear
        </InputX>
        <button onClick={() => onClick1("*1111*")}>test1</button>
        <button onClick={() => onClick1("*2222*")}>test2</button>
      </div>
    </>
  );
}

interface Props {
  children?: string;
  refBack: HTMLInputElement;
}

const InputX = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const clearText = () => {
    props.refBack.value = "";
  };
  return (
    <div>
      <input type="text" ref={ref} />
      <button onClick={clearText}>{props?.children}</button>
    </div>
  );
});

export default App1;
