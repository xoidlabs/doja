# Doja

**Doja** is the first *headless framework* ever that lets you write components **ONCE**, then turn them into real Vue, React, or web components! This is achieved **WITHOUT** transpilation, plugins, or preprocessors.

By itself, **Doja** doesn't have a lifecycle, context, or JSX implementation. **Doja**'s `effect` or `inject` exports connect to React's `useEffect` or Vue's `onMounted`/`onUnmounted` under the hood. Similarly, the `doja/jsx-runtime` is simply an empty object forwarded to React or Vue's own JSX runtimes. There are 3 packages at the moment:
- `doja-react` - React integration
- `doja-vue` - Vue integration
- `@doja/pce` - Web components using the `preact-custom-element` package

A **Doja** component is so simplistic, and you can use one of the following flavors:

### Function components

```js
import { create } from 'doja'

const Counter = () => {
  let count = create(0)
  return () => (
    <>
      {count.value}
      <button onClick={() => count.value++}>+</button>
      <button onClick={() => count.value--}>-</button>
    </>
  )
}
```

### Class components (not implemented yet)

```js
class Counter extends Doja {
  count = 0
  render = () => (
    <>
      {this.count}
      <button onClick={() => this.count++}>+</button>
      <button onClick={() => this.count--}>-</button>
    </>
  )
}
```


### Using the `doja/macro` (not implemented yet)

```js
import $ from 'doja/macro'

const Counter = () => {
  let count = $(0)
  return () => (
    <>
      {count}
      <button onClick={() => count++}>+</button>
      <button onClick={() => count--}>-</button>
    </>
  )
}
```
> `doja/macro` is inspired by [Svelte 5's Runes](https://svelte.dev/blog/runes). It's a reactivity transform using the `babel-plugin-macros`.

## Full demonstration

Observe the following app:

`~/components/App.tsx`
```js
// @jsxImportSource doja
import Doja, { create, effect, inject, type InjectionKey } from 'doja'

const theme = { background: 'pink' }

const ThemeSymbol: InjectionKey<typeof theme> = Symbol()

const Counter = (props: { initalValue: number }) => {
  const theme = inject(ThemeSymbol)
  const count = create(props.initialValue)

  return () => (
    <div style={{ background: theme.background }}>
      {count.value}
      <button onClick={() => count.value++}>+</button>
      <button onClick={() => count.value--}>-</button>
    </div>
  )
}
Counter.observedAttributes = ['initialValue'] // Vue and Web components need this beforehand*
Counter.tagName = 'my-counter' // Web components need this

const ThemeProvider = Doja(ThemeSymbol)

const App = () => {
  effect(() => {
    console.log('i was mounted')
    return () => console.log('i was unmounted')
  })
  
  return (
    <ThemeProvider value={theme}>
      <Counter initialValue={0} />
    </ThemeProvider>
  )
}

export { theme, ThemeSymbol, ThemeProvider, Counter, App }
```
> *Hint: you can use [ts-keysof.macro](`https://www.npmjs.com/package/ts-keysof.macro`) to automatically generate observed attributes from prop types


We can export them as React and Vue components simply as:

`~/components-react/App.tsx`
```js
import toReact from 'doja-react'
import { App, Counter as CounterDoja, ThemeProvider as ThemeProviderDoja } from '~/components/App'

export const Counter = toReact(CounterDoja)
export const ThemeProvider = toReact(ThemeProviderDoja)
export default toReact(App)
```

`~/components-vue/App.tsx`
```js
import toVue from 'doja-vue'
import { App, Counter as CounterDoja, ThemeProvider as ThemeProviderDoja } from '~/components/App'

export const Counter = toVue(CounterDoja)
export const ThemeProvider = toVue(ThemeProviderDoja)
export default toVue(App)
```
Alternatively, you can re-export the `ThemeSymbol` for Vue users, since `provide`/`inject` is a common practice in Vue.
```js
import { InjectionKey } from 'vue'
import { theme, ThemeSymbol as ThemeSymbolDoja } from '~/components/App'

export const ThemeSymbol = ThemeSymbolDoja as InjectionKey<typeof theme>
```

## API

Here are the framework-specific APIs that you can replace with **Doja**:

|  | <img src="https://raw.githubusercontent.com/xoidlabs/xoid/master/assets/logo-plain.svg" width="16"/> Doja | <img src="https://raw.githubusercontent.com/xoidlabs/xoid/master/assets/integrations/react.ico" width="16"/> React | <img src="https://raw.githubusercontent.com/xoidlabs/xoid/master/assets/integrations/vue.png" width="16"/> Vue |
|---|---|---|---|
| State | `create`, `reactive` | `useState` | `ref`, `reactive` |
| Derived state | `create` | `useMemo` | `computed` |
| Lifecycle | `effect` | `useEffect` | `onMounted`, `onUnmounted` |
| Context | `inject` | `useContext` | `inject` |
| Watch state | `watch` | *none* | `watch`|
| Converting between state APIs | `toAtom` | *none* | `toRef`|



<!-- ### How it works

**Doja** is just a thin layer over the 1.2kB state management library **xoid**. It doesn't have a dedicated virtual dom or reconciler. Doja makes use of the isomorphic JSX runtimes of React and Vue. Both React and Vue hasisomorphic `react/jsx-runtime` and `vue/jsx-runtime` modules. This is how Babel or Typescript uses to transpile your JSX under the hood. Both JSX runtimes has isomorphic exports named `jsx`, `jsxs`, `Fragment`. -->

## Comparison to React

<table>
<thead><tr>
  <th align="left">Doja</th>
  <th align="left">React</th>
</tr></thead>
<tbody><tr valign="top">

<td>

```js
import { create } from 'doja';

function Counter() {
  const $count = create(0);
  const increment = () => $count.value++;
  const decrement = () => $count.value--;

  return () => (
    <div>
      <p>Count: {$count.value}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

</td>
<td>

```js
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

</td>
</tr>
</table>

### `useRef`: Doja doesn't need it.

<table>
<thead><tr>
  <th align="left">Doja</th>
  <th align="left">React</th>
</tr></thead>
<tbody><tr valign="top">

<td>

```js
import { create, effect } from 'doja';

function MyComponent() {
  const myInputRef = create();

  effect(() => {
    myInputRef.value.focus();
  }, []);

  return <input ref={myInputRef} />;
}
```

</td>
<td>

```js
import { useRef, useEffect } from 'react';

function MyComponent() {
  const myInputRef = useRef();

  useEffect(() => {
    myInputRef.current.focus();
  }, []);

  return <input ref={myInputRef.set} />;
}
```

</td>
</tr>
</table>

> No need for an extra hook such as `useRef`. Simply use the same atom creator function.


### `createContext`: Doja doesn't need it.

<table>
<thead><tr>
  <th align="left">Doja</th>
  <th align="left">React</th>
</tr></thead>
<tbody><tr valign="top">

<td>

```js
import { inject } from 'doja';

const MySymbol = Symbol();

function ParentComponent() {
  return () => (
    <MySymbol value={'Hello from Context!'}>
      <ChildComponent />
    </MySymbol>
  );
}

function ChildComponent() {
  const contextValue = inject(MySymbol);

  return () => <div>{contextValue}</div>;
}
```

</td>
<td>

```js
import { createContext, useContext } from 'react';

const MyContext = createContext();

function ParentComponent() {
  return (
    <MyContext.Provider value={'Hello from Context!'}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const contextValue = useContext(MyContext);

  return <div>{contextValue}</div>;
}
```

</td>
</tr>
</table>

> Doja can use ES6 symbols as a context provider, just like how Vue does.

### `forwardRef`: Doja doesn't need it.

<table>
<thead><tr>
  <th align="left">Doja</th>
  <th align="left">React</th>
</tr></thead>
<tbody><tr valign="top">

<td>

```js
const MyInput = (props, ref) => {
  return () => <input ref={ref} />;
};

function ParentComponent() {
  const myInputRef = useRef();

  return () => <MyInput ref={myInputRef.set} />;
}
```

</td>
<td>

```js
import { forwardRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} />;
});

function ParentComponent() {
  const myInputRef = useRef();

  return <MyInput ref={myInputRef} />;
}
```

</td>
</tr>
</table>

> Doja doesn't need a `forwardRef` export. If you define a component with a second argument, it'll simply use it to forward the ref.

### `useMemo`


<table>
<thead><tr>
  <th align="left">Doja</th>
  <th align="left">React</th>
</tr></thead>
<tbody><tr valign="top">
<td>

```js
import { create } from 'doja';

const ExampleComponent = () => {
  const $count = create(0);

  const $squared = $count.map((count) => {
    console.log('Computing squared value...');
    return count * count;
  });

  return () => (
    <div>
      <p>Count: {$count.value}</p>
      <p>Squared Value: {$squared.value}</p>
      <button onClick={() => $count.value++}>Increment</button>
    </div>
  );
};
```

</td>
<td>

```js
import { useState, useMemo } from 'react';

const ExampleComponent = () => {
  const [count, setCount] = useState(0);

  const squaredValue = useMemo(() => {
    console.log('Computing squared value...');
    return count * count;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Squared Value: {squaredValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

</td>
</tbody>
</table>


### `useImperativeHandle`: Doja doesn't need it.

<table>
<thead><tr>
  <th align="left">Doja</th>
  <th align="left">React</th>
</tr></thead>
<tbody><tr valign="top">

<td>

```js
import { create } from 'react';

// Child component that forwards the ref
const ChildComponent = (props, ref) => {
  const inputRef = create();
  ref.value = {
    focus: () => {
      inputRef.value.focus();
    },
  }

  return () => <input ref={inputRef.set} />;
};

// Parent component using ChildComponent with ref
function ParentComponent() {
  const childRef = create();

  const handleClick = () => {
    // Call the exposed focus method on the child component
    childRef.value.focus();
  };

  return () => (
    <div>
      <ChildComponent ref={childRef.set} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

</td>
<td>

```js
import { useRef, useImperativeHandle, forwardRef } from 'react';

// Child component that forwards the ref
const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  // Expose only the focus method to the parent component
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} />;
});

// Parent component using ChildComponent with ref
function ParentComponent() {
  const childRef = useRef();

  const handleClick = () => {
    // Call the exposed focus method on the child component
    childRef.current.focus();
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

</td>
</tr>
</table>

> Like we said: "Most hooks are complete bloat from a static closure's perspective.

<!-- ### `useLayoutEffect`: Doja doesn't need it.

TODO -->