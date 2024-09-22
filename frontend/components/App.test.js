import React from "react";
import AppFunctional from "./AppFunctional";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// Write your tests here
describe("AppFunctional Bileşenleri Testleri", () => {
  beforeEach(() => {
    render(<AppFunctional />);
  });
});
test("Başlangıçta başlık ve butonlarda doğru metinler görünüyor", () => {
  expect(screen.getByTestId("coordinates")).toHaveTextContent(
    "Koordinatlar (2,2)"
  );
  expect(screen.getByTestId("steps")).toHaveTextContent("0 kere ilerlediniz");
  expect(screen.getByText("SOL")).toBeInTheDocument();
  expect(screen.getByText("YUKARI")).toBeInTheDocument();
  expect(screen.getByText("SAĞ")).toBeInTheDocument();
  expect(screen.getByText("AŞAĞI")).toBeInTheDocument();
});
