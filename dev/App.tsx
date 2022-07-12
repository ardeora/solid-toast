import { Component } from "solid-js";
import toast, { Toaster } from "../src";

const App: Component = () => {
  let toastID: string[] = [];
  const popSuccess = () =>
    toastID.push(
      toast.success(`Success! ${toastID.length + 1}`, { duration: Infinity })
    );
  const popError = () =>
    toastID.push(
      toast.error(`Error! ${toastID.length + 1}`, { duration: Infinity })
    );
  const closeAll = () => {
    toastID.forEach((id) => toast.dismiss(id));
    toastID = [];
  };
  return (
    <div>
      <Toaster position="top-center" />
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          "align-items": "flex-start",
          gap: "0.5rem",
        }}
      >
        <button onClick={popSuccess}>Pop success</button>
        <button onClick={popError}>Pop error</button>
        <button onClick={closeAll}>Close all toasts</button>
      </div>
    </div>
  );
};

export default App;
