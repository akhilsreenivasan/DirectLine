import * as react from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Ideas from "./Ideas";
import { hackIdeas, initialState } from "../../store";
import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";
function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(hackIdeas, reduxState || initialState);
  return render(<Provider store={store}>{ui}</Provider>);
}
describe("submit employee id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const user = { name: "Joe", id: 1500 };
  test("Test Initial Rendering Without Data", () => {
    let user = { name: "Joe", id: 1500 };
    let hacks = [];
    const { getByText, container } = renderWithProviders(
      <Ideas user={user} />,
      {
        reduxState: { user, hacks },
      }
    );
    waitFor(() => {
      expect(getByText(/ChallengesCmp/i)).toBeInTheDocument();
    });
    getByText(/All Challenges/i);
    getByText(/No Challenges Available/i);
    expect(container).toMatchSnapshot();
  });

  test("Test Initial Rendering With Data", () => {
    let user = { name: "Joe", id: 1501 };
    let hacks = [
      {
        id: 1,
        title: "One",
        description:
          "Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description",
        tags: ["name", "two", "three"],
        userId: 1501,
        creationDate: 1645266448714,
        userName: "Joe",
        votedList: [1500, 1503],
      },
    ];
    const { getByText, container } = renderWithProviders(
      <Ideas user={user} />,
      {
        reduxState: { user, hacks },
      }
    );
    getByText(/All Challenges/i);
    getByText(/No Challenges Available/i);
    expect(container).toMatchSnapshot();
  });

  test("Toggle changes button", () => {
    let user = { name: "Joe", id: 1500 };
    let hacks = [
      {
        id: 1,
        title: "One",
        description:
          "Test Description Test Description Test Description Test Description Test Description Test Description Test Description Test Description",
        tags: ["name", "two", "three"],
        userId: 1500,
        creationDate: 1645266448714,
        userName: "Joe",
        votedList: [1500, 1503],
      },
    ];
    const { getByText, getByTestId, container } = renderWithProviders(
      <Ideas user={user} />,
      {
        reduxState: { user, hacks },
      }
    );
    const button = getByTestId("toggle-challenges");
    fireEvent.click(button);
    waitFor(() => {
      expect(getByText(/No Challenges Available/i)).toBeInTheDocument();
    });
    expect(getByText(/My Challenges/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
