import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { hackIdeas, initialState } from "../../store";
import { createStore } from "redux";
import { Provider } from "react-redux";

function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(hackIdeas, reduxState || initialState);
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("submit employee id", () => {
  test("check button", () => {
    let user = [
      {
        name: "Joe",
        id: 1500,
      },
    ];
    let hacks = [];
    const { getByText } = renderWithProviders(<Login />, { user, hacks });
    getByText("Submit");
  });
});
