import { Component } from 'solid-js';
import toast, { Toaster } from '../src';

const App: Component = () => {
  const popSuccess = () => toast.success('Success!', { duration: Infinity });
  const popError = () => toast.error('Error!', { duration: Infinity });
  const closeAll = () => toast.dismiss();
  return (
    <div>
      <Toaster position="bottom-center" />
      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          'align-items': 'flex-start',
          gap: '0.5rem',
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
