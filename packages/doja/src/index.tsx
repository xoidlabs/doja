// @ts-nocheck
import { Reactive } from '@xoid/reactive'

export * from 'xoid'
export { effect, inject } from 'xoid/setup'
export type { InjectionKey } from 'xoid/setup'
export * from '@xoid/reactive'

const isDoja = (item) => typeof item === 'symbol' || (typeof item === 'function' && item[DOJA])

const memoizedTransform = (transformer, type) => {
  if (!transformer.map) transformer.map = new WeakMap()
  const attempt = transformer.map.get(type)
  if (attempt) return attempt
  const component = transformer(type)
  transformer.map.set(component)
  return component
}

export const getCreateElement = function (jsx, transformer) {
  return (type, ...rest) => {
    if (isDoja(type)) type = memoizedTransform(transformer, type)
    return jsx(type, ...rest)
  }
}

export const swapJsxRuntime = (jsxRuntime, transformer) => {
  jsxRuntime.jsx = getCreateElement(jsxRuntime.jsx, transformer)
  jsxRuntime.jsxs = getCreateElement(jsxRuntime.jsxs, transformer)
  jsxRuntime.Fragment = getCreateElement(jsxRuntime.Fragment, transformer)
}

export type DojaInput<P, _S> = (props: Reactive<P>) => () => JSX.Element | null

type ToProps<P, S> = S extends string ? P & Record<`slot-${S}`, JSX.Element> : P

export type DojaFC<P, S> = ((props: ToProps<P, S>) => JSX.Element | null) & AdditionalData<S>

type AdditionalData<S> = {
  props?: string[]
  slots?: S[]
}

const DOJA = Symbol()

const Doja = <P, S = undefined>(fn: DojaInput<P, S>): DojaFC<P, S> => {
  // @ts-ignore
  fn[DOJA] = true
  // @ts-ignore
  return fn
}

// secret, untyped
;(Doja as any).symbol = DOJA

export default Doja
export const slots = (key?: string) => (Doja as any).runtime.slots(key)
