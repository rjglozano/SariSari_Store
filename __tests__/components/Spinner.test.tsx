import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Spinner from "@/components/Spinner";
import "@testing-library/jest-dom";

describe("Spinner component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render properly", () => {
    render(<Spinner />);

    // Use screen queries to get elements and make assertions
    const spinner = screen.getByRole("status");
    const loadingText = screen.getByText("Loading...");

    // Example assertion
    expect(spinner).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
  });
});
