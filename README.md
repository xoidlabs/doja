# Doja

**Doja** is the first *headless framework* ever that lets you write components **ONCE**, then turn them into real Vue, React, or web components! This is achieved **WITHOUT** transpilation, plugins, or preprocessors.

By itself, **Doja** doesn't have a lifecycle, context, or JSX implementation. **Doja**'s `effect` or `inject` exports connect to React's `useEffect` or Vue's `onMounted`/`onUnmounted` under the hood. Similarly, the `doja/jsx-runtime` is simply an empty object forwarded to React or Vue's own JSX runtimes. There are 3 packages at the moment:
- `@doja/react` - React integration
- `@doja/vue` - Vue integration
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
import toReact from '@doja/react'
import { App, Counter as CounterDoja, ThemeProvider as ThemeProviderDoja } from '~/components/App'

export const Counter = toReact(CounterDoja)
export const ThemeProvider = toReact(ThemeProviderDoja)
export default toReact(App)
```

`~/components-vue/App.tsx`
```js
import toVue from '@doja/vue'
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