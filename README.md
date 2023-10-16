<p align="center">
  <a href="https://xoid.dev">
    <img width="560" src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/logo-full.svg" />
  </a>
</p> 

<p align="center">
  <a href="#-react">
    <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/react.ico" width="14"/>
    React
  </a>&nbsp;&nbsp;
  <a href="#-vue">
    <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/vue.png" width="14"/>
    Vue
  </a>&nbsp;&nbsp;
  <a href="#-svelte">
    <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/svelte.png" width="14"/>
    Svelte
  </a>&nbsp;&nbsp;
  <a href="#subscriptions">
    <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/js.png" width="14"/>
    Vanilla JS
  </a>&nbsp;&nbsp;
  <a href="#subscriptions">
    <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/redux.svg" width="14"/>
    Redux Devtools
  </a>
</p>

<p align="center">
  <a href="https://bundlephobia.com/result?p=xoid" >
    <img alt="Bundle Size" src="https://img.shields.io/bundlephobia/min/xoid?label=bundle%20size&style=flat&colorA=4f2eb3&colorB=4f2eb3">
  </a>
  <a href="https://www.npmjs.com/package/xoid">
    <img alt="Version" src="https://img.shields.io/npm/v/xoid?style=flat&4f2eb3=293140&colorA=4f2eb3&colorB=4f2eb3">
  </a>
  <a href="https://www.npmjs.com/package/xoid">
    <img alt="Downloads" src="https://img.shields.io/npm/dt/xoid.svg?style=flat&colorA=4f2eb3&colorB=4f2eb3"/>
  </a>
  <a href="https://www.npmjs.com/package/xoid">
    <img alt="License" src="https://img.shields.io/github/license/onurkerimov/xoid?style=flat&4f2eb3=293140&colorA=4f2eb3&colorB=4f2eb3">
  </a>
</p>


**xoid** (*ksoid or zoid*) is a framework-agnostic state management library. 
**X** in its name is an ode to great projects such as Redu**X**, Mob**X** and **X**state. Its the result of careful analyses of different state management tools and paradigms. It was designed to be simple and scalable.

The biggest aim of **xoid** is to unify global state, local component state, and finite state machines in the single API. It even has a basic support for observable streams. It might be the very first library to introduce the notion of [isomorphic component logic](#-isomorphic-component-logic) that's able to run across multiple frameworks. 
With xoid, you can move business logic out of components in a **truly** framework-agnostic manner.


While doing all these, it also cares about its package size (~1.2kB gzipped), and aims to keep itself approachable for newcomers. More features are explained below, and the [documentation website](https://xoid.dev).

To install, run the following command:

```bash
npm install xoid
```

---

<h3 align="center">

Visit [xoid.dev](https://xoid.dev) for detailed docs and recipes.

</h3>

---

## Examples

- [Counter](https://github.com/onurkerimov/xoid/blob/master/examples/counter) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat&colorA=4f2eb3&colorB=4f2eb3&logo=codesandbox)](https://githubbox.com/onurkerimov/xoid/tree/master/examples/counter)

- [Todos (Basic)](https://github.com/onurkerimov/xoid/blob/master/examples/todos-basic) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat&colorA=4f2eb3&colorB=4f2eb3&logo=codesandbox)](https://githubbox.com/onurkerimov/xoid/tree/master/examples/todos-basic)

- [Todos (Filtered)](https://github.com/onurkerimov/xoid/blob/master/examples/todos-filtered) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat&colorA=4f2eb3&colorB=4f2eb3&logo=codesandbox)](https://githubbox.com/onurkerimov/xoid/tree/master/examples/todos-filtered)

- [Celcius-Fahrenheit conversion](https://github.com/onurkerimov/xoid/blob/master/examples/celcius-fahrenheit) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat&colorA=4f2eb3&colorB=4f2eb3&logo=codesandbox)](https://githubbox.com/onurkerimov/xoid/tree/master/examples/celcius-fahrenheit)

- [Finite state stopwatch](https://github.com/onurkerimov/xoid/blob/master/examples/finite-state-stopwatch) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat&colorA=4f2eb3&colorB=4f2eb3&logo=codesandbox)](https://githubbox.com/onurkerimov/xoid/tree/master/examples/finite-state-stopwatch)

- [Dots and arrows](https://githubbox.com/onurkerimov/xoid/tree/master/examples/dots-and-arrows) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat&colorA=4f2eb3&colorB=4f2eb3&logo=codesandbox)](https://githubbox.com/onurkerimov/xoid/tree/master/examples/dots-and-arrows)

- [Transient update resize observer](https://github.com/onurkerimov/xoid/blob/master/examples/transient-update-resize-observer) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat&colorA=4f2eb3&colorB=4f2eb3&logo=codesandbox)](https://githubbox.com/onurkerimov/xoid/tree/master/examples/transient-update-resize-observer)

- [xoid vs useReducer vs useMethods](https://githubbox.com/onurkerimov/xoid/tree/master/examples/xoid-vs-usereducer-vs-usemethods) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat&colorA=4f2eb3&colorB=4f2eb3&logo=codesandbox)](https://githubbox.com/onurkerimov/xoid/tree/master/examples/xoid-vs-usereducer-vs-usemethods)



## Quick Tutorial

### Atom

Atoms are holders of state.

```js
import create from 'xoid'
// or: import { create } from 'xoid'

const $count = create(3)
console.log($count.value) // 3
$count.set(5)
$count.update((state) => state + 1)
console.log($count.value) // 6
```

Atoms may have actions.

```js
import create from 'xoid'

const $count = create(5, (atom) => ({
  increment: () => atom.update(s => s + 1),
  decrement: () => atom.update(s => s - 1)
}))

$count.actions.increment()
```

There's the `.focus` method, which can be used as a selector/lens. **xoid** is based on immutable updates, so if you "surgically" set state of a focused branch, changes will propagate to the root.

```js
import create from 'xoid'

const $atom = create({ deeply: { nested: { alpha: 5 } } })
const previousValue = $atom.value

// select `.deeply.nested.alpha`
const $alpha = $atom.focus(s => s.deeply.nested.alpha)
$alpha.set(6)

// root state is replaced with new immutable state
assert($atom.value !== previousValue) // ✅
assert($atom.value.deeply.nested.alpha === 6) // ✅
```

### Derived state

State can be derived from other atoms. This API was heavily inspired by **Recoil**.

```js
const $alpha = create(3)
const $beta = create(5)
// derived atom
const $sum = create((read) => read($alpha) + read($beta))
```

Alternatively, `.map` method can be used to quickly derive the state from a single atom.

```js
const $alpha = create(3)
// derived atom
const $doubleAlpha = $alpha.map((s) => s * 2)
```
> Atoms are lazily evaluated. This means that the callback functions of `$sum` and `$doubleAlpha` in this example won't execute until the first subscription to these atoms. This is a performance optimization.

### Subscriptions

For subscriptions, `subscribe` and `watch` are used. They are the same, except `watch` runs the callback immediately, while `subscribe` waits for the first update after subscription.

```js
const unsub = $atom.subscribe((state, previousState) => {
  console.log(state, previousState)
})

// later
unsub()
```
> To cleanup side-effects, a function can be returned in the subscriber function. (Just like `React.useEffect`)

## Integrations

### <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/react.ico" width="16"/> React

Just use **@xoid/react** and import `useAtom`. No context providers are needed.

```js
import { useAtom } from '@xoid/react'

// in a React component
const state = useAtom(atom)
```

### <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/vue.png" width="16"/> Vue

Just use `@xoid/vue` and import `useAtom`.

```html
<script setup>
import { useAtom } from '@xoid/vue'
import { myAtom } from './my-atom'

const value = useAtom(myAtom)
</script>

<template>
  <div>{{ value }}</div>
</template>
```


### <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/svelte.png" width="16"/> Svelte

Just use `@xoid/svelte` and import `useAtom`.

```html
<script>
  import { useAtom } from '@xoid/svelte'
  import { myAtom } from './my-atom'
  let atom = useAtom(myAtom)

</script>

<header>{$atom}</header>
```

### 🔥 Isomorphic component logic

**xoid** takes component logic seriously. The main package has `effect` and `inject` exports. With them, you can write component logic ONCE and make it run across different frameworks. 

The following function is called a "setup function".
All `@xoid/react`, `@xoid/vue`, and `@xoid/svelte` modules have an isomorphic `useSetup` function that can consume functions like this.

```js
import create, { effect, inject, Atom } from 'xoid'
import { ThemeSymbol } from './theme'

export const CounterSetup = ($props: Atom<{ initialValue: number }>) => {
  const { initialValue } = $props.value

  const $counter = create(initialValue)
  const increment = () => $counter.update((s) => s + 1)
  const decrement = () => $counter.update((s) => s - 1)

  effect(() => {
    console.log('mounted')
    return () => console.log('unmounted')
  })

  const theme = inject(ThemeSymbol)
  console.log("theme is obtained using context:", theme)

  return { $counter, increment, decrement }
}
```

With **xoid**, you can effectively replace the following framework-specific APIs:

|  | <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/logo-plain.svg" width="16"/> xoid | <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/react.ico" width="16"/> React | <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/vue.png" width="16"/> Vue | <img src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/integrations/svelte.png" width="16"/> Svelte |
|---|---|---|---|---|
| State | `create` | `useState` / `useReducer` | `reactive` / `ref` | `readable` / `writable` |
| Derived state | `create` | `useMemo` | `computed` | `derived` |
| Lifecycle | `effect` | `useEffect` | `onMounted`, `onUnmounted` | `onMount`, `onDestroy` |
| Dependency injection | `inject` | `useContext` | `inject` | `getContext` |

> **✨ Opinionated comment ✨**
>
> **xoid**'s mental model of component logic, just like Vue and Svelte, is a static closure instead of a render function. From a static closure's perspective, most React hooks are complete bloat. Bringing this kind of component mental model to React was one of the first reasons behind **xoid**'s existence.

### Redux Devtools

Import `@xoid/devtools` and set a `debugValue` to your atom. It will send values to the Redux Devtools Extension.

```js
import { devtools } from '@xoid/devtools'
import create from 'xoid'
devtools() // run once

const atom = create(
  { alpha: 5 }, 
  (atom) => {
    const $alpha = atom.focus(s => s.alpha)
    return {
      resetState: () => atom.set({ alpha: 5 })
      deeply: { nested: { action: () => $alpha.update((s) => s + 1) } }
    }
  }
)

atom.debugValue = 'myAtom' // enable watching it by the devtools

const { deeply, incrementAlpha } = atom.actions
incrementAlpha() // logs "(myAtom).incrementAlpha"
deeply.nested.action() // logs "(myAtom).deeply.nested.action"
atom.focus(s => s.alpha).set(25)  // logs "(myAtom) Update ([timestamp])
```

## Finite state machines

No additional syntax is required for state machines. Just use the `create` function.

```js
import create from 'xoid'
import { useAtom } from '@xoid/react'

const createMachine = () => {
  const red = { color: '#f00', onClick: () => atom.set(green) }
  const green = { color: '#0f0', onClick: () => atom.set(red) }
  const atom = create(red)
  return atom
}

// in a React component
const { color, onClick } = useAtom(createMachine)
return <div style={{ color }} onClick={onClick} />
```

---

If you've read until here, you have enough knowledge to start using **xoid**. You can refer to the [documentation website](https://xoid.dev) for more.


## Why **xoid**?

<img align="right" width="50%" src="https://raw.githubusercontent.com/onurkerimov/xoid/master/assets/diagram.png" alt="Venn diagram that shows that xoid is able to unify global, local state, and finite state machines across React, Vue, Svelte, and vanilla JS">

- Easy to learn
- Small bundle size
- Framework-agnostic
- No middlewares needed
- First-class Typescript support
- Easy to work with nested states
- Computed values, transient updates
- Same API to rule them all!
  - Global state, Local state, FSMs, Streams
  - React, Vue, Svelte, Vanilla JavaScript

## Packages

- `xoid` - Core package
- `@xoid/react` - **React** integration
- `@xoid/vue` - **Vue** integration
- `@xoid/svelte` - **Svelte** integration
- `@xoid/devtools` - **Redux Devtools** integration
- `@xoid/lite` - Lighter version with less features
- `@xoid/feature` - A plugin system oriented in ES6 classes


## Thanks
Following awesome projects inspired **xoid** a lot.
- [Recoil](https://github.com/facebookexperimental/Recoil)
- [zustand](https://github.com/pmndrs/zustand)
- [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree)

Thanks to [Anatoly](http://a-maslennikov.com/) for the pencil&ruler icon [#24975](https://www.flaticon.com/free-icon/ruler_245975).

