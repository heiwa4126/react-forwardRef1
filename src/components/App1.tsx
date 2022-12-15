import React, { useRef, forwardRef } from "react";

function App1() {
  console.log("App1 render");
  const ref1 = useRef<HTMLInputElement>(null!);
  const onClick1 = (msg: string) => {
    ref1.current.value = msg;
  };

  return (
    <>
      <div>
        <InputX ref={ref1} refBack={ref1.current}>
          clear
        </InputX>
        <div>
          <button onClick={() => onClick1("*1111*")}>test1</button>
          <button onClick={() => onClick1("*2222*")}>test2</button>
          ** clear button works sometime. **
        </div>
      </div>
    </>
  );
}

interface Props {
  children?: string;
  refBack: HTMLInputElement;
}

const InputX = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const clearText = () => {
    props.refBack.value = ""; // DON'T WORK
  };
  return (
    <div>
      <input type="text" ref={ref} />
      <button onClick={clearText}>{props?.children}</button>
    </div>
  );
});

export default App1;
