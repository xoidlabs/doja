/** @jsxImportSource doja */
import Doja from 'doja'
import 'doja-react/auto'
import 'doja-vue/auto'

import { h } from 'vue'
import { render as renderVue } from '@testing-library/vue'

import React from 'react'
import { render as renderReact } from '@testing-library/react'

const Parent = Doja(() => () => (
  <div>
    <Child />
  </div>
))

const Child = Doja(() => () => <div>count: 1</div>)

it('Renders markup in React', async () => {
  const { findByText } = renderReact(React.createElement(Parent))

  await findByText('count: 1')
})

it('Renders markup in Vue', async () => {
  const { findByText } = renderVue(h(Parent as any))

  await findByText('count: 1')
})
