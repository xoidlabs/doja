// @ts-nocheck

import Doja, { computed, toReactive } from 'doja'
import { createProvider, useSetup, useAtom } from '@xoid/react'
import jsxReact from 'react/jsx-runtime'
import jsxDoja from 'doja/jsx-runtime'

const toReact = ((arg, arg2) => {
  if (typeof arg === 'symbol') return createProvider(arg, arg2)
  return (props) => {
    jsxDoja.current = jsxReact
    Doja.runtime = toReact
    const renderFunction = useSetup((props) => arg(toReactive(props)), props)
    return useAtom(() => {
      Doja.runtime.slots = (key) => props[key || 'children']
      return computed(renderFunction)
    })
  }
}) as {
  <P>(component: (props: P) => JSX.Element | null): (props: P) => JSX.Element | null
  <T>(key: InjectionKey<T>, defaultValue: T): Provider<T>
}
export default toReact
