import { Component, createEffect, createMemo, createSignal, onCleanup } from 'solid-js';
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
    className: "border-2 border-orange-800",
    style: {
      color: '#c2410c',
      background: '#ffedd5'
    },
    duration: Infinity
  });
  const popTimer = () => toast.custom((t) => {
    const [life, setLife] = createSignal(100)
    
    createEffect(() => {
      if (t.paused) return; 
      const interval = setInterval(() => {
        console.log(t.paused)
        setLife(l => l - 0.5)
      }, 10)

      onCleanup(() => clearInterval(interval))
    })

    return (
      <div class="bg-pink-100 shadow-md px-4 py-3 rounded overflow-hidden relative text-pink-700">
        <div style={{width: `${life()}%`}} class="bg-pink-200 h-full absolute top-0 left-0" ></div>
        <span class="relative" >Timer In The Background</span>
      </div>
    )
  }, {
    duration: 2000,
    unmountDelay: 1000
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
        <button class={"timer"}   onClick={popTimer}>Toast Timer</button>
        <button class={"close"}   onClick={closeAll}>Close all toasts</button>
        
      </div>
    </div>
  );
};

export default App;
