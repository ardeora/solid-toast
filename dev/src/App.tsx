import { Component } from 'solid-js';
import toast, { Toaster } from '../../src';

const makePromise = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const toss = Math.random()
      if (toss > 0.5) resolve('Successful!')
      reject('Something went wrong!')
    }, 2000)
  })
}

const App: Component = () => {
  const popBlank = () => toast('Blank Toast');
  const popSuccess = () => toast.success('Success!', { duration: Infinity });
  const popError = () => toast.error('Error!', { duration: Infinity });
  const popLoading = () => toast.loading('Loading...');
  const popPromise = () => toast.promise(makePromise(), {
    loading: <span class="promise-txt">Loading Promise</span>,
    success: msg => <span class="promise-txt">{msg}</span>,
    error: err => <span class="promise-txt">{err}</span>
  });
  const popCustom = () => toast.success('Add Custom Styles', {
    iconTheme: {
      primary: '#ea580c',
      secondary: '#ffedd5'
    },
    className: "border-2 border-orange-800 bg-orange-100",
    style: {
      color: '#c2410c'
    },
    duration: Infinity
  });

  const closeAll = () => toast.dismiss();
  return (
    <div class="px-6">
      <Toaster position="top-center" />
      <h1>Solid Toast Examples</h1>
      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          'align-items': 'flex-start',
          gap: '0.5rem',
        }}
      >
        <button class={"blank"}   onClick={popBlank}>Blank Toast</button>
        <button class={"success"} onClick={popSuccess}>Success Toast</button>
        <button class={"error"}   onClick={popError}>Error Toast</button>
        <button class={"loading"} onClick={popLoading}>Loading Toast</button>
        <button class={"promise"} onClick={popPromise}>Promise Toast</button>
        <button class={"custom"} onClick={popCustom}>Custom Styles</button>
        <button class={"close"}   onClick={closeAll}>Close all toasts</button>
      </div>
    </div>
  );
};

export default App;
