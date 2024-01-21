/* eslint-disable react-hooks/rules-of-hooks */
import { onUnmounted, defineComponent, getCurrentInstance, renderSlot } from 'vue'
import Doja, { DojaFC, InjectionKey, create, toReactive } from 'doja'

// import jsxVue from 'vue/jsx-runtime'
// import jsxDoja from 'doja/jsx-runtime'
import { useSetup, createProvider } from '@xoid/vue'
import { GetState } from 'xoid'

export { h, Fragment } from 'vue'

// @ts-ignore
const INTERNAL = create.internal.symbol

export const createEvent = () => {
  const fns = new Set<Function>()
  const add = (fn: Function) => {
    fns.add(fn)
  }
  const fire = () => {
    fns.forEach((fn) => fn())
    fns.clear()
  }
  return { add, fire }
}

export const createGetState =
  (updateState: () => void, add: (fn: Function) => void): GetState =>
  // @ts-ignore
  (read) => {
    // @ts-ignore
    add(read.subscribe(updateState))
    return (read as any)[INTERNAL].get()
  }

const toVue = (<T, U extends string>(arg: DojaFC<T, U>, arg2: any) => {
  if (typeof arg === 'symbol') {
    // @ts-ignore
    return createProvider(arg, arg2)
  }
  return defineComponent({
    props: arg.props || [],
    setup(props) {
      // @ts-ignore
      // jsxDoja.current = jsxVue
      // @ts-ignore
      Doja.runtime = toVue
      // @ts-ignore
      const render = useSetup((props) => arg(toReactive(props)), props as T) as any

      const event = createEvent()
      const instance = getCurrentInstance()
      const get = createGetState(() => {
        event.fire()
        instance?.proxy?.$forceUpdate()
      }, event.add)
      onUnmounted(() => event.fire())
      // @ts-ignore
      return () => {
        ;(Doja as any).runtime.slots = (key?: string) =>
          renderSlot((instance as any)?.proxy?.$slots, key || 'default')
        // @ts-ignore
        const tools = create.internal
        const oldGet = tools.get
        tools.get = get
        const result = render()
        tools.get = oldGet
        return result
      }
    },
  })
}) as unknown as {
  <T>(component: (props: T) => JSX.Element | null): (props: T) => JSX.Element | null
  <T>(key: InjectionKey<T>, defaultValue: T): React.Provider<T>
}

export default toVue
export * from 'doja'
