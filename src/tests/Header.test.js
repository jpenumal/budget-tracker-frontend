import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";

//unit test
test("renders header component", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const headingElement = screen.getByText(/Budget Tracker/i);
  expect(headingElement).toBeInTheDocument();
});

//Visual regression test
describe("Header Visual Regression Test", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(container).toMatchImageSnapshot();
  });
});
