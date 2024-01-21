import React from 'react'

import { fireEvent, render as renderReact } from '@testing-library/react'
import { render as renderVue } from '@testing-library/vue'
import Counter from './Counter'
import { h, defineComponent } from 'vue'
import 'doja-react/auto'
import 'doja-vue/auto'

describe('Same isomorphic component works in React and Vue', () => {
  const loggerFn = jest.fn()
  let consoleLog: any

  beforeEach(() => {
    consoleLog = console.log
    console.log = loggerFn
  })

  afterEach(() => {
    console.log = consoleLog
    jest.resetAllMocks()
  })

  test('React', async () => {
    const { findByText, getByText, rerender, unmount } = renderReact(
      // @ts-ignore
      <Counter initialValue={5}>
        <span>a slot renders me</span>
      </Counter>
    )

    await findByText('a slot renders me')

    expect(loggerFn).toBeCalledTimes(1)
    expect(loggerFn).toBeCalledWith('mounted')

    await findByText('count: 5')
    fireEvent.click(getByText('+'))
    await findByText('count: 6')

    rerender(<Counter initialValue={25} />)

    await findByText('count: 25')
    fireEvent.click(getByText('-'))
    await findByText('count: 24')

    unmount()
    expect(loggerFn).toBeCalledTimes(4)
    expect(loggerFn).toBeCalledWith('unmounted')
  })

  test('Vue', async () => {
    const Wrapper = defineComponent(() => {
      return () => h(Counter as any, { initialValue: 5 }, () => [h('div', {}, 'a slot renders me')])
    })

    const { findByText, getByText, rerender, unmount } = renderVue(Wrapper)

    await findByText('a slot renders me')

    expect(loggerFn).toBeCalledTimes(1)
    expect(loggerFn).toBeCalledWith('mounted')

    await findByText('count: 5')
    fireEvent.click(getByText('+'))
    await findByText('count: 6')

    rerender({ initialValue: 25 })

    await findByText('count: 25')
    fireEvent.click(getByText('-'))
    await findByText('count: 24')

    unmount()
    expect(loggerFn).toBeCalledTimes(4)
    expect(loggerFn).toBeCalledWith('unmounted')
  })
})
