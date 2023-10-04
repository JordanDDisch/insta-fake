import { RenderResult, render } from "@testing-library/react"
import { TamaguiProvider } from "tamagui"
import config from 'app/tamagui.config'

export const renderWithTamagui = (
  ui: JSX.Element,
): RenderResult =>
  render(
    <TamaguiProvider config={config}>
      {ui}
    </TamaguiProvider>,
    {}
  )
