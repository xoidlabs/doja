/** @jsxImportSource doja */
import Doja, { create, effect, slots, watch } from 'doja'

const Counter = Doja<{ initialValue: number }>((props) => {
  const $counter = create(props.initialValue)
  watch(() => $counter.set(props.initialValue))

  effect(() => {
    console.log('mounted')
    return () => console.log('unmounted')
  })

  return () => (
    <div>
      count: {$counter.value}
      <button onClick={() => $counter.value++}>+</button>
      <button onClick={() => $counter.value--}>-</button>
      {slots()}
    </div>
  )
})

Counter.props = ['initialValue']

export default Counter
