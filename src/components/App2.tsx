// example from
// https://qiita.com/sazumy/items/30966cd848ce2f02b440

import { useRef, useImperativeHandle, forwardRef } from "react";

// 公開したいメソッドの定義
interface Handler {
  setFocus(): void;
  clearText(): void;
}

// 公開したいメソッドを持つコンポーネントの定義
// プロパティを追加する場合は、forwardRef<Handler, Props>と定義する。
const FancyInput = forwardRef<Handler>((props, ref) => {
  const inputRef = useRef({} as HTMLInputElement);

  useImperativeHandle(ref, () => {
    return {
      setFocus() {
        inputRef.current.focus();
      },
      clearText() {
        inputRef.current.value = "";
      },
    };
  });

  return <input ref={inputRef} type="text" />;
});

// コンポーネントの使い方
const App2 = () => {
  const ref = useRef({} as Handler);
  return (
    <>
      <FancyInput ref={ref} />
      <button
        onClick={() => {
          ref.current.setFocus();
        }}
      >
        focus
      </button>
      <button
        onClick={() => {
          ref.current.clearText();
        }}
      >
        clear
      </button>
    </>
  );
};

export default App2;
