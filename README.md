<a href="https://github.com/ardeora/solid-toast"><img alt="Solid Toast header image showing a cute toaster with a toast popping out" src="https://github.com/ardeora/solid-toast/raw/main/assets/header.png"/></a>

<div align="center">
    <img src="https://badgen.net/npm/v/solid-toast" alt="NPM Version" />
    <a href="https://bundlephobia.com/package/solid-toast">
    <img src="https://img.shields.io/badge/Bundle%20Size-4kb-brightgreen" alt="minzipped size"/>
    </a>
    <img src="https://github.com/ardeora/solid-toast/workflows/build/badge.svg" alt="Build Status" />
</a>
</div>
<br />
<div align="center"><strong>Create beautiful, customizable toasts in SolidJS.</strong></div>
<br />
<div align="center" >
<a  href="https://stackblitz.com/edit/vitejs-vite-njwzfq?file=src/App.tsx">StackBlitz Demo</a>
</div>

<br />

## Features

- **Easily Customizable**
- **Promise API**
- **Lightweight**
- **Accessible**
- **SSR Support**

## Installation

#### With yarn

```sh
yarn add solid-toast
```

#### With NPM

```sh
npm install solid-toast
```

## Getting Started

Add a Toaster to your component tree. This component will render all toasts. Now you can trigger `toast()` from anywhere!

```jsx
import toast, { Toaster } from 'solid-toast';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
```

## Documentation

### `toast()` Function

Call this function from anywhere to create a toast.

#### Available Options

You can provide `ToastOptions` as the second argument. They will overwrite all options received from the `<Toaster/>` component.

```js
toast('This is a simple toast!', {
  duration: 5000,
  position: 'top-right',
  // Add a delay before the toast is removed
  // This can be used to time the toast exit animation
  unmountDelay: 500,
  // Styling - Supports CSS Objects, classes, and inline styles
  // Will be applied to the toast container
  style: {
    'background-color': '#f00',
  },
  className: 'my-custom-class',
  // Custom Icon - Supports text as well as JSX Elements
  icon: '🍩',
  // Set accent colors for default icons that ship with Solid Toast
  iconTheme: {
    primary: '#fff',
    secondary: '#000',
  },
  // Aria Props - Supports all ARIA props
  aria: {
    role: 'status',
    'aria-live': 'polite',
  },
});
```

#### Creating Toasts

There are several options for creating toasts

##### Blank

```js
toast('This is a blank toast!');
```

Blank toasts do not come with a default icon. However, you can set a custom JSX Element/Text (Emoji) icon by placing it in the `icon` option.

##### Success

```js
toast.success('Successfully saved!');
```

Creates a notification with an animated checkmark. Color accents can be themed with the `iconTheme` option.

##### Error

```js
toast.error('Something went wrong!');
```

Creates a notification with an animated error icon. Color accents can be themed with the `iconTheme` option.

##### Loading

```js
toast.loading('Loading Photos...');
```

Shows a toast with a loading indicator icon. The content can later be updated with an error or success icon. See how to update the toast content [here](#updating-toasts).

##### Promise

The `promise()` function can be used to create a toast from a promise. This function will automatically show a loading icon and update the toast with the result of the promise.

```jsx
const myPromise = fetchData();

toast.promise(myPromise, {
  loading: 'Loading',
  success: <b>Got the data</b>,
  error: 'An error occurred 😔',
});
```

##### Custom Toast

You also have the ability to completely customize the appearance of your toast.
A custom JSX Element can be passed in like so:

```jsx
toast.custom(() => (
  <div>
    <h1>Custom Toast</h1>
    <p>This is a custom toast!</p>
  </div>
));
```

###### Advanced Option

You can also hook into the toast life-cycle by adding a parameter to the JSX Function call like so:

```jsx
toast.custom(
  (t) => (
    <div>
      <h1>Custom Toast</h1>
      <p>This is a custom toast!</p>
      <p>{t.visible ? 'Showing' : 'I will close in 1 second'}</p>
      <button onClick={() => toast.dismiss(t.id)}>Close Toast</button>
    </div>;
  ),
  {
    unmountDelay: 1000,
  }
);
```

#### Helpful Utilities

##### Dismiss Toasts Programatically

You can manually dismiss a notification with `toast.dismiss`. Beware that it triggers the exit animation and does not remove the Toast instantly. Toasts will auto-remove after 500ms by default. You can adjust the dismiss duration with the `unmountDelay` option.

###### Dismiss Single Toast

```js
const toastId = toast.loading('Loading...');
// ...
toast.dismiss(toastId);
```

Dismiss all toasts by omitting all arguments.

###### Dismiss All Toasts

```js
toast.dismiss();
```

##### Remove Toasts Instantly

Toasts can be removed instantly with toast.remove. This will not trigger the exit animation and remove the toast instantly.

```js
toast.remove(toastId);
// or
toast.remove();
```

##### Updating Toasts

Each toast call returns a unique id. Use this `id` in the toast options to update an existing toast.

```js
const toastId = toast.loading('Loading...');
// ...
toast.success('This worked', {
  id: toastId,
});
```

### `Toaster` Component

This component will render all toasts.

#### Available Options

```jsx
<Toaster
  position="top-center"
  // Spacing between each toast in pixels
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options that each toast will inherit. Will be overwritten by individual toast options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },
  }}
/>
```

## Acknowledgements

This project is inspired by

- [React Hot Toast](https://github.com/timolins/react-hot-toast)
