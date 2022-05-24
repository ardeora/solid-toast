<a href="https://github.com/ardeora/solid-toast"><img alt="Solid Toast header image showing a cute toaster with a toast popping out" src="https://github.com/ardeora/solid-toast/raw/main/assets/header.png"/></a>

<div align="center">
    <img src="https://badgen.net/npm/v/solid-toast" alt="NPM Version" />
    <img src="https://github.com/ardeora/solid-toast/workflows/build/badge.svg" alt="Build Status" />
</a>
</div>
<br />
<div align="center"><strong>Create beautiful, customizable toasts in SolidJS.</strong></div>

<br />

## Features

- **Easily Customizable**
- **Promise API**
- **Lightweight** 
- **Accessible**

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

Add a Toaster Component to the top level of your component tree. This will be the container element that will display all the toasts. Now you can trigger `toast()` from anywhere!

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
Coming Soon

## Acknowledgements
This project is inspired by 
- [React Hot Toast](https://github.com/timolins/react-hot-toast)
