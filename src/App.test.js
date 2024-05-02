import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getAllByTitle(/Budget Tracker/i);
  expect(linkElement).toBeInTheDocument();
});

// Unit test case for header
