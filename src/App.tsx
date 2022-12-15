import "./App.css";
import App1 from "./components/App1";
import App2 from "./components/App2";
import App3 from "./components/App3";

const header = "forwardRef example";

function App() {
  return (
    <>
      <h1>{header} 1</h1>
      <App1 />
      <h1>{header} 2</h1>
      <App2 />
      <h1>{header} 3</h1>
      <App3 />
    </>
  );
}

export default App;
