import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Login, { validateEmail } from "../Login";
import userEvent from "@testing-library/user-event";

describe("Test login component", () => {
  test("render form with 1 button", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    // console.log(buttonList);
    expect(buttonList).toHaveLength(1);
  });

  test("Should be failed on email validation", () => {
    const testEmail = "azumaya.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("Should be succeed on email validation", () => {
    const testEmail = "azumaya@gmail.com";
    expect(validateEmail(testEmail)).toBe(true);
  });

  test("Password input should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type", "password");
  });

  test("Should be able to submit the form", async () => {
    render(<Login />);
    const submitButton = screen.getByTestId("submit");
    const email = screen.getByPlaceholderText("メールアドレス入力");
    const password = screen.getByPlaceholderText("パスワード入力");

    userEvent.type(email, "azumaya@gmail.com");
    userEvent.type(password, "123456");

    userEvent.click(submitButton);
    const userInfo = await waitFor(() => screen.getByTestId("user"));
    expect(userInfo).toBeInTheDocument();
  });
});
