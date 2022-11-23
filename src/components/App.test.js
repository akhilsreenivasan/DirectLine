import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { hackIdeas, initialState } from "../store";
import { createStore } from "redux";
import { MemoryRouter as Router } from "react-router-dom";
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHref: () => jest.fn(),
  useNavigate: () => mockedUsedNavigate,
}));
function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(hackIdeas, reduxState || initialState);
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
}

test("renders text element", () => {
  const { getByText } = renderWithProviders(<App />, {});
  expect(getByText(/Hack Idea/i)).toBeInTheDocument();
  getByText(/Enter Employee Id/i);
  getByText(/Login/i);
});
