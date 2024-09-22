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
test("Başlık ve butonlarda doğru metinler görünüyor", () => {
  expect(true).toBe(false);
});
