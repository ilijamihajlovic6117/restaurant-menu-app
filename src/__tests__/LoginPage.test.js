jest.mock("axios");

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";

test("prikazuje login formu", () => {
  render(<LoginPage />);

  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/lozinka/i)).toBeInTheDocument();
});
