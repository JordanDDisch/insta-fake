import { rest } from "msw"
import { server } from "app/mocks/server"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { flikrEndpoint } from "app/config/endpoints"
import { mockFlikrData as responseMock } from "app/mocks/mockFlikrData"
import { renderWithTamagui } from "app/mocks/tamagui"
import { Gallery } from "."

const user = userEvent.setup()

describe("<Gallery />", () => {
  test("Gallery should render", () => {
    const { getByTestId } = renderWithTamagui(
      <Gallery />
    )

    expect(getByTestId("gallery")).toBeInTheDocument()
  })

  test("Should search text and render images", async () => {
    server.use(
      rest.get(flikrEndpoint, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.set("Content-Type", "application/json"),
          ctx.json(responseMock)
        )
      })
    )

    renderWithTamagui(
      <Gallery />
    )

    expect(screen.getByTestId("gallery")).toBeInTheDocument()

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument()

    await user.type(await screen.findByPlaceholderText("Search"), "cats")

    expect(screen.getByText("Search")).toBeInTheDocument()

    await user.click(screen.getByText("Search"))

    expect(await screen.findAllByAltText("")).toHaveLength(10)
  })
})