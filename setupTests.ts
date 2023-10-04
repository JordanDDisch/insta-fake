// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "whatwg-fetch"
import "@testing-library/jest-dom"
import { configure } from "@testing-library/dom"
import { cleanup } from "@testing-library/react"
import failOnConsole from "jest-fail-on-console"

import { server } from "./packages/app/mocks/server"

failOnConsole()
configure({ asyncUtilTimeout: 9000 })

beforeAll(() => server.listen(
  {
    onUnhandledRequest: "warn"
  }
))

afterEach(cleanup)
beforeAll(() => server.listen())
afterEach(() => {
  jest.resetModules()
  jest.restoreAllMocks()
  jest.clearAllMocks()
  jest.resetAllMocks()
  server.resetHandlers()
})
afterAll(() => server.close())
