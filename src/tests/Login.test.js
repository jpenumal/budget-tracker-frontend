import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import Login from "../pages/Login";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

// E2E testing
describe("Login Component", () => {
  it("Navigates to home on successful login", async () => {
    axios.post.mockResolvedValue({ data: { success: true } });
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    //Enter input values
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "email@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "passwor@1234" },
    });

    //Click on login button
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Login/i }));
    });

    //Navigate to home
    await waitFor(() => expect(window.location.pathname).toBe("/"));
  });
});
