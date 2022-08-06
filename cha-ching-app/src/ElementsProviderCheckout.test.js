import { render, screen } from "@testing-library/react";
import ElementsProviderCheckout from "./ElementsProviderCheckout";
import { MemoryRouter } from "react-router-dom";

describe("<ElementsProviderCheckout/>", () => {
  test("renders Loading when options are undefined", async () => {
    const component = render(
      <MemoryRouter initialEntries={[{ pathname: "/", state: {} }]}>
        <ElementsProviderCheckout />
      </MemoryRouter>,
    );
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(component.asFragment()).toMatchSnapshot();
  });

  test("renders Error when clientSecret is null", async () => {
    const component = render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { clientSecret: null } }]}
      >
        <ElementsProviderCheckout />
      </MemoryRouter>,
    );
    expect(await screen.findByText("error")).toBeInTheDocument();
    expect(component.asFragment()).toMatchSnapshot();
  });

  test("renders Stripe's Elements provider with clientSecret", async () => {
    const component = render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/", state: { clientSecret: "my_fake_secret" } },
        ]}
      >
        <ElementsProviderCheckout />
      </MemoryRouter>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByText("error")).not.toBeInTheDocument();
    expect(await screen.findByRole("form")).toBeInTheDocument();
    expect(component.asFragment()).toMatchSnapshot();
  });
});
