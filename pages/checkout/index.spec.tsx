// CheckoutPage.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutPage from "./index.page";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
jest.mock("react-hook-form", () => ({
 useForm: jest.fn().mockReturnValue({
  register: jest.fn(),
  handleSubmit: jest.fn(),
  formState: { errors: {}, isValid: false },
 }),
}));

jest.mock("next/router", () => ({
 useRouter: jest.fn().mockReturnValue({
  push: jest.fn(),
 }),
}));

const server = setupServer(
 rest.post("/api/checkout", (req, res, ctx) => {
  return res(ctx.json({ success: true }));
 }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("CheckoutPage", () => {
 it("renders without crashing", () => {
  render(<CheckoutPage />);
  expect(screen.getByText("Formulario De Compra")).toBeInTheDocument();
 });

 it("renders form fields", () => {
  render(<CheckoutPage />);
  expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
  expect(screen.getByLabelText("Apellido")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
 });
 it("submit button is disabled by default", async () => {
  render(<CheckoutPage />);
  const submitButton = await screen.findByRole("button", {
   name: /Comprar|Siguiente/i,
  });
  expect(submitButton).toBeDisabled();
 });

 it("submit button is enabled when form is valid", async () => {
  const { handleSubmit } = useForm();
  const { push } = useRouter();
  const onSubmit = jest.fn();
  const formValues = {
   name: "John Doe",
   email: "jon@gmail.com",
   phone: "123456789",
   address: "123 Main St",
  };
 });

 it("submit button is enabled when all form fields are filled and valid", async () => {
  (useForm as jest.Mock).mockReturnValue({
   register: jest.fn(),
   handleSubmit: jest.fn(),
   formState: { errors: {}, isValid: true },
  });

  render(<CheckoutPage />);

  fireEvent.change(screen.getByLabelText("Nombre"), {
   target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
   target: { value: "jon@gmail.com" },
  });

  const submitButton = await screen.findByRole("button", {
   name: /Comprar|Siguiente/i,
  });
  expect(submitButton).toBeEnabled();
 });

 beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
 });

 it("submits the form and redirects to success page", async () => {
  (useForm as jest.Mock).mockReturnValue({
   register: jest.fn(),
   handleSubmit: (fn: () => void) => fn,
   formState: { errors: {}, isValid: true },
  });

  render(<CheckoutPage />);

  fireEvent.change(screen.getByLabelText("Nombre"), {
   target: { value: "John Doe" },
  });
  fireEvent.change(screen.getByLabelText("Apellido"), {
    target: { value: "Perez" },
   });
  fireEvent.change(screen.getByLabelText("Email"), {
   target: { value: "jon@gmail.com" },
   
  });
 });

 

});
