import { Component } from "solid-js";
import toast, { Toaster } from "../src";

const App: Component = () => (
  <div>
    <Toaster position="top-center" />
    <button
      onClick={(e) => {
        e.preventDefault();
        toast.success("Hello World!", { duration: Infinity });
      }}
    >
      asf
    </button>
  </div>
);

export default App;
