// @ts-nocheck

import toReact from './transformer'
import { swapJsxRuntime, getCreateElement } from 'doja'

import React from 'react'
import jsxReact from 'react/jsx-runtime'
import jsxDevReact from 'react/jsx-dev-runtime'

swapJsxRuntime(jsxReact, toReact)
swapJsxRuntime(jsxDevReact, toReact)
React.createElement = getCreateElement(React.createElement, toReact)
React.Fragment = getCreateElement(React.Fragment, toReact)

export * from 'doja'
export { default } from 'doja'

export const h = React.createElement
export const Fragment = React.Fragment
